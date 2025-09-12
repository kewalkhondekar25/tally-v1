import { serviceHandler } from "../utils/serviceHandler";
import prisma from "@repo/db/client";

const get = async (email: string) => {
    return await serviceHandler( async () => {
        const existingUser = await prisma.user.findUnique({
            where: { 
                email
            }
        });
        return existingUser;
    });
};

const create = async (email: string, password: string) => {
    return await serviceHandler( async () => {
        const newUser = await prisma.user.create({
            data: {  
                email,
                password
            },
            select: {
                email: true
            }
        });
        return newUser;
    });
} ;

const saveGoogleSheetRefreshToken = async (email: string, refreshToken: string) => {
    return await serviceHandler( async () => {
        return await prisma.$transaction( async (tx) => {
            const userId = await tx.user.findUnique({
                where: { email },
                select: { id: true, email: true }
            });

            await tx.tokens.upsert({
                where: { userId: userId?.id },
                update: { googleSheetRefreshToken: refreshToken! },
                create: {
                    userId: userId?.id!,
                    googleSheetRefreshToken: refreshToken!
                }
            })
        });
    });
};

export {
    get,
    create,
    saveGoogleSheetRefreshToken
};