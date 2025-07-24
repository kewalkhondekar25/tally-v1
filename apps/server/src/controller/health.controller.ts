import { RequestHandler } from "express";
import asyncHandler from "../utils/asyncHandler";
import apiResponse from "../utils/responseHandler";

const health: RequestHandler = asyncHandler( async (req, res) => {
    return res.status(200).json(new apiResponse(
        true,
        200,
        "HEALTH CHECK PASSED",
        { 
            timestamp: new Date()
        }
    ));
});

export { health };