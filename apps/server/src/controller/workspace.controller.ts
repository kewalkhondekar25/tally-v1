import asyncHandler from "../utils/asyncHandler";
import * as workspaceService from "../service/workspace.service";
import { apiError } from "../utils/errorHandler";
import apiResponse from "../utils/responseHandler";
import { RequestHandler } from "express";

const getAllWorkspaces: RequestHandler = asyncHandler( async (req, res) => {
    
    const userId = (req as any).user?.id;
    
    const workspaces = await workspaceService.getAll(userId);
    if(!workspaces){
        throw apiError("Workspaces not found", 404)
    };

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Workspaces fetched successfully",
        workspaces
    ));
});

const getWorkspace: RequestHandler = asyncHandler( async (req, res) => {

    const userId = (req as any).user?.id;
    const workspaceId = req.params.workspaceId;

    if(!workspaceId){
        throw apiError("Workspace id not found in params", 400);
    };

    const workspace = await workspaceService.get(userId, workspaceId);
    if(!workspace){
        throw apiError("Workspace not found", 404);
    };

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Workspace fetched successfully",
        workspace
    ));
});

const createWorkspace: RequestHandler = asyncHandler( async (req, res) => {

    const userId = (req as any).user?.id;
    
    const newWorkspace = await workspaceService.create(userId);
    if(!newWorkspace){
        throw apiError(
            "Failed to create workspace",
            500
        );
    };

    return res.status(201).json(new apiResponse(
        true,
        201,
        "Workspace created successfully",
        newWorkspace
    ));
});

const updateWorkspace: RequestHandler = asyncHandler( async (req, res) => {
    
    const { newName } = req.body;
    const workspaceId = req.params?.workspaceId;

    if(!workspaceId){
        throw apiError("Workspace id not found in params", 400);
    };

    const workspaceRename = await workspaceService.update(workspaceId, newName);

    if(!workspaceRename){
        throw apiError("Unable to rename workspace", 500);
    };

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Workspace updated successfully",
        workspaceRename
    ));
});

const deleteWorkspace: RequestHandler = asyncHandler( async (req, res) => {

    const workspaceId = req.params.workspaceId;
    if(!workspaceId){
        throw apiError("Workspace id not found in params", 400);
    };

    const trashedWorkspace = await workspaceService.trash(workspaceId);
    if(!trashedWorkspace){
        throw apiError("Failed to delete workspace", 500)
    };

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Workspace deleted successfully"
    ));
});



export { createWorkspace, getAllWorkspaces, getWorkspace, updateWorkspace, deleteWorkspace };