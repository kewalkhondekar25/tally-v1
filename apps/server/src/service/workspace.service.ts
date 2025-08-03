import prisma from "@repo/db/client";
import { serviceHandler } from "../utils/serviceHandler";

const create = async (userId: string) => {
    return await serviceHandler(async () => {
        const newWorkspace = await prisma.workspace.create({
            data: {
                name: "My Workspace",
                userId: userId,
                createdAt: new Date(),
            },
            include: { files : true }
        });
        return newWorkspace;
    });
};

const getAll = async (userId: string) => {
    return await serviceHandler(async () => {
        const workspaces = await prisma.workspace.findMany({
            where: { userId },
            include: { files: true }
        });
        return workspaces;
    });
};

const get = async (userId: string, workspaceId: string) => {
    return await serviceHandler(async () => {
        const workspace = await prisma.workspace.findUnique({
            where: { 
                id: workspaceId
            },
            include: { files: true }
        });
        return workspace;
    });
};

const update = async (workspaceId: string, newName: string) => {
    return serviceHandler( async () => {
        const workspaceRename = await prisma.workspace.update({
            where: { id: workspaceId },
            data: { name: newName },
            select: { name: true }
        });
        return workspaceRename;
    });
};

const trash = async (workspaceId: string) => {
    return serviceHandler( async () => {
        const deletedWorkspace = await prisma.workspace.delete({
            where: { id: workspaceId}
        });
        return deletedWorkspace;
    });
};

export { create, getAll, get, update, trash };