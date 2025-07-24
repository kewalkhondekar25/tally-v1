import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ErrorHandler){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    };
    return res.status(500).json({
        success: false,
        message: "SOMETHING WENT WRONG"
    });
};

export { errorHandlerMiddleware };