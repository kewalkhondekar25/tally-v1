import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";
import { ZodError } from "zod";

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ErrorHandler){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    };
    
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.issues.map(e => ({
                field: e.path.join("."),
                message: e.message
            }))
        });
    };
    
    return res.status(500).json({
        success: false,
        message: "SOMETHING WENT WRONG"
    });
};

export { errorHandlerMiddleware };