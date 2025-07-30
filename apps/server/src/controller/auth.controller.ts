import { RequestHandler } from "express";
import * as authService from "../service/auth.service";
import asyncHandler from "../utils/asyncHandler";
import { apiError } from "../utils/errorHandler";
import { checkPassword, hashPassword } from "../utils/hashing";
import apiResponse from "../utils/responseHandler";
import { generateToken } from "../utils/jwt";

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
        user
    ));
});

export {
    register,
    login,
    logout,
    getAuthUser
};