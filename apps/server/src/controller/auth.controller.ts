import { RequestHandler } from "express";
import * as authService from "../service/auth.service";
import * as formService from "../service/form.service";
import asyncHandler from "../utils/asyncHandler";
import { apiError } from "../utils/errorHandler";
import { checkPassword, hashPassword } from "../utils/hashing";
import apiResponse from "../utils/responseHandler";
import { generateToken } from "../utils/jwt";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_SHEET_CLIENT_ID,
    process.env.GOOGLE_SHEET_CLIENT_SECRET,
    process.env.GOOGLE_SHEET_REDIRECT_URI
);

const register: RequestHandler = asyncHandler( async (req, res) => {

    const {email, password} = req.body;
    
    const existingUser = await authService.get(email);
    
    if(!existingUser){
        const hashedPassword = await hashPassword(password);
        const newUser = await authService.create(email, hashedPassword);
        return res.status(201).json(new apiResponse(
            true,
            201,
            "User registered successfully",
            newUser
        ));
    }
    throw apiError(
        "Email already exists",
        409
    )
});

const login: RequestHandler = asyncHandler( async (req, res) => {

    let isPasswordOk: boolean = false;
    const { email, password } = req.body;
    
    const user = await authService.get(email);

    if(user){
        isPasswordOk = await checkPassword(password, user?.password);
    }

    if(!user || !isPasswordOk){
        throw apiError(
            "Invalid email or password",
            401
        );
    };

    const token = generateToken(user.id, user.email);
    
    const options = {
        httpOnly: true,
        secure: true
    }
    
    return res.status(200).cookie("accessToken", token, options).json(new apiResponse(
        true,
        200,
        "User Logged In Successfully",
        { token }
    ));
});

const logout: RequestHandler = asyncHandler( async (req, res) => {
    
    const options = {
        httpOnly: true,
        secure: true
    };
    return res.status(200).clearCookie("accessToken", options).json(
        new apiResponse(
            true,
            200,
            "User logged out succefully"
        )
    );
});

const getAuthUser: RequestHandler = asyncHandler ( async (req, res) => {
    const user = (req as any).user;
    return res.status(200).json(new apiResponse(
        true,
        200,
        "Auth userr fetched successfully",
        user.email
    ));
});

const googleAuthHandler: RequestHandler = asyncHandler ( async (req, res) => {
    
    const { token: googleToken } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const { sub, email } = payload as { sub: string, email: string };

    const existingEmail = await authService.get(email);
    if(!existingEmail){
        await authService.create(email, sub);
    };

    const user = await authService.get(email);
    const token = generateToken(user?.id!, user?.email!);

    const options = {
        httpOnly: true,
        secure: true
    };

    return res.status(200).cookie("accessToken", token, options).json(new apiResponse(
        true,
        200,
        "Google login successfull",
        user
    ));
});

const googleSheetAuthHandler: RequestHandler = asyncHandler ( async (req, res) => {
    
    const user = (req as any).user;
    const { formId, formName } = req.query;
    
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: ["https://www.googleapis.com/auth/spreadsheets"],
        state: encodeURIComponent(JSON.stringify({ email: user.email, formId, formName }))
    });
    return res.redirect(url);
});

const googleSheetAuthHandlerCallback: RequestHandler = asyncHandler ( async (req,res) => {
    
    const code = req.query.code as string;
    const state = JSON.parse(decodeURIComponent(req.query.state as string));
    console.log("state", state);
    

    const { tokens }: { tokens: any} = await oauth2Client.getToken(code);
    console.log("google sheets token", tokens);

    await authService.saveGoogleSheetRefreshToken(state.email, tokens.refresh_token);

    //create spreadsheet
    oauth2Client.setCredentials({ refresh_token: tokens.refresh_token });
    const sheet = google.sheets({ version: "v4", auth: oauth2Client });

    const fields = await formService.getFormFields(state.formId);
    
    const spreadSheetResponse = await sheet.spreadsheets.create({
        requestBody: {
            properties: {
                title: state.formName
            },
            sheets: [
                {
                    properties: { title: "Responses"},
                    data:[
                        {
                            startRow: 0,
                            startColumn: 0,
                            rowData: [
                                {
                                    values: fields.map(item => ({
                                        userEnteredValue: { stringValue: item.blockQuestion }
                                    }))
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    });

    const { spreadsheetId, spreadsheetUrl } = spreadSheetResponse.data;
    if(!spreadsheetId || !spreadsheetUrl){
        throw apiError("Failed to create spreadsheet", 400);
    };

    await formService.createSpreadSheet(state.formId, state.formName, spreadsheetId, spreadsheetUrl);
    
    return res.redirect(`${process.env.DOMAIN}/form/${state.formId}/integrations`);
});

export {
    register,
    login,
    logout,
    getAuthUser,
    googleAuthHandler,
    googleSheetAuthHandler,
    googleSheetAuthHandlerCallback
};