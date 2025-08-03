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

export { create };