import dotenv from "dotenv";
dotenv.config();
import prisma from "@repo/db/client";
import request from "supertest";
import app from "../app";

const BACKEND_URL = "/api/v1";
// process.env.JWT_SECRET ??= "test_secret_value";

//payload
const testUser = {
    email: "walter.white@breakingbad.com",
    password: "Heisenberg"
};

const deleteDb = async () => {
    await prisma.$transaction([
        prisma.file.deleteMany(),
        prisma.workspace.deleteMany(),
        prisma.user.deleteMany(),
    ]);
};

beforeAll(async() => {
    await prisma.user.deleteMany();
    await prisma.workspace.deleteMany();
    await prisma.file.deleteMany();
});

afterAll(async() => {
    await prisma.$disconnect();
});


describe("Workspace and file creation", () => {
    
    let cookie: string | undefined;
    
    beforeEach(async () => {
        await deleteDb();
        await request(app).post(`${BACKEND_URL}/auth/register`).send(testUser);
        const loginRes = await request(app).post(`${BACKEND_URL}/auth/login`).send(testUser);
        cookie = loginRes.headers["set-cookie"];
    });
    
    it("Should create a workspace", async () => {
        
        const user = await prisma.user.findFirst();
        const userId = user?.id;
        
        const res = await request(app).post(`${BACKEND_URL}/workspace/create`).set("Cookie", cookie!);
        console.log("create post req", res);
        
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Workspace created successfully");
        expect(res.body.data).toEqual({
            id: expect.any(String),
            name: "My Workspace",
            userId,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            files: []  
        });
    });

    it("Should update workspace name", async () => {

    })
})

