import asyncHandler from "../utils/asyncHandler";
import * as workspaceService from "../service/workspace.service";
import { apiError } from "../utils/errorHandler";
import apiResponse from "../utils/responseHandler";
import { RequestHandler } from "express";

const createWorkspace: RequestHandler = asyncHandler( async (req, res) => {

    const userId = (req as any).user?.id;
    console.log("userId in controller", userId);
    
    
    const newWorkspace = await workspaceService.create(userId);
    if(!newWorkspace){
        return apiError(
            "Failed to create workspace",
            400
        );
    };

    return res.status(201).json(new apiResponse(
        true,
        201,
        "Workspace created successfully",
        newWorkspace
    ));
});

export { createWorkspace };