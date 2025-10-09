import { CookieOptions, RequestHandler } from "express";
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

const register: RequestHandler = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const existingUser = await authService.get(email);

    if (!existingUser) {
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

const login: RequestHandler = asyncHandler(async (req, res) => {

    let isPasswordOk: boolean = false;
    const { email, password } = req.body;

    const user = await authService.get(email);

    if (user) {
        isPasswordOk = await checkPassword(password, user?.password);
    }

    if (!user || !isPasswordOk) {
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

const logout: RequestHandler = asyncHandler(async (req, res) => {

    const options: CookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: ".kewalkhondekar.dev",
        path: "/"
    };
    return res.status(200).clearCookie("accessToken", options).json(
        new apiResponse(
            true,
            200,
            "User logged out succefully"
        )
    );
});

const getAuthUser: RequestHandler = asyncHandler(async (req, res) => {
    const user = (req as any).user;
    return res.status(200).json(new apiResponse(
        true,
        200,
        "Auth userr fetched successfully",
        user.email
    ));
});

const googleAuthHandler: RequestHandler = asyncHandler(async (req, res) => {

    const { token: googleToken } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const { sub, email } = payload as { sub: string, email: string };

    const existingEmail = await authService.get(email);
    if (!existingEmail) {
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

const googleSheetAuthHandler: RequestHandler = asyncHandler(async (req, res) => {

    const user = (req as any).user;
    const { formId, formName } = req.query;
    console.log(JSON.stringify(formName, null, 2));


    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: ["https://www.googleapis.com/auth/spreadsheets"],
        state: encodeURIComponent(JSON.stringify({ email: user.email, formId, formName }))
    });
    return res.redirect(url);
});

const googleSheetAuthHandlerCallback: RequestHandler = asyncHandler(async (req, res) => {

    const code = req.query.code as string;
    console.log("code", JSON.stringify(code, null, 2));

    const state = JSON.parse(decodeURIComponent(req.query.state as string));
    console.log("state", state);


    const { tokens }: { tokens: any } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials({ refresh_token: tokens.refresh_token });

    if (tokens.refresh_token) {
        await authService.saveGoogleSheetRefreshToken(state.email, tokens.refresh_token);
    }

    //create spreadsheet
    const sheet = google.sheets({ version: "v4", auth: oauth2Client });

    const fields = await formService.getFormFields(state.formId);

    const spreadSheetResponse = await sheet.spreadsheets.create({
        requestBody: {
            properties: {
                title: state.formName
            },
            sheets: [
                {
                    properties: { title: "Responses" },
                    data: [
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
    if (!spreadsheetId || !spreadsheetUrl) {
        throw apiError("Failed to create spreadsheet", 400);
    };

    await formService.createSpreadSheet(state.formId, state.formName, spreadsheetId, spreadsheetUrl);

    return res.redirect(`${process.env.DOMAIN}/form/${state.formId}/integrations`);
});

//notion
const notionAuthHandler: RequestHandler = asyncHandler(async (req, res) => {

    const user = (req as any).user;
    const { formId, formName } = req.params;

    const url = `https://api.notion.com/v1/oauth/authorize?` +
        new URLSearchParams({
            client_id: process.env.NOTION_CLIENT_ID!,
            redirect_uri: process.env.NOTION_REDIRECT_URI!,
            response_type: "code",
            owner: "user",
            state: encodeURIComponent(JSON.stringify({ email: user.email, formId, formName }))
        });

    res.redirect(url);
});

const notionAuthHandlerCallback: RequestHandler = asyncHandler(async (req, res) => {

    const code = req.query.code as string;
    const state = JSON.parse(decodeURIComponent(req.query.state as string));

    const basicAuth = Buffer.from(
        `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch("https://api.notion.com/v1/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`,
        },
        body: JSON.stringify({
            grant_type: "authorization_code",
            code,
            redirect_uri: process.env.NOTION_REDIRECT_URI,
        }),
    });

    const tokens = await response.json();

    await authService.saveNotionToken(state.email, tokens.access_token, tokens.refresh_token);

    const dbInfo = await fetch("https://api.notion.com/v1/search", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28",
        },
        body: JSON.stringify({
            filter: {
                property: "object",
                value: "database",
            },
        }),
    });
    const notionDbData = await dbInfo.json();
    console.log(JSON.stringify(notionDbData, null, 2));

    const dbId = notionDbData.results[0].id;
    const dbName = notionDbData.results[0].title[0].text.content;
    const dbUrl = notionDbData.results[0].url;

    await authService.saveNotionDbData(state.formId, dbId, dbName, dbUrl);

    return res.redirect(`${process.env.DOMAIN}/form/${state.formId}/integrations`);
});


export {
    register,
    login,
    logout,
    getAuthUser,
    googleAuthHandler,
    googleSheetAuthHandler,
    googleSheetAuthHandlerCallback,
    notionAuthHandler,
    notionAuthHandlerCallback
};