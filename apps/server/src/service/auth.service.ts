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

export {
    get,
    create
};