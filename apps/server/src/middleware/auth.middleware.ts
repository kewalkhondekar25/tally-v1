import asyncHandler from "../utils/asyncHandler";
import { apiError } from "../utils/errorHandler";
import { verifyToken } from "../utils/jwt";
import * as userService from "../service/auth.service";
import { JwtPayload } from "jsonwebtoken";
import { RequestHandler } from "express";

interface Payload extends JwtPayload {
    id: string;
    email: string;
};

const verifyJwt: RequestHandler = asyncHandler( async (req, res, next) => {

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
    if(!token){
        throw apiError("Unauthorized or Expired Token", 401);
    };

    const tokenPayload = verifyToken(token) as Payload;

    const user = await userService.get(tokenPayload?.email);
    if(!user){
        throw apiError("Invalid Access Token", 401)
    };

    (req as any).user = {
        id: tokenPayload?.userId,
        email: tokenPayload?.email
    };

    next();
});

export {
    verifyJwt
}