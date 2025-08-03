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

let cookie: string | undefined;

beforeAll(async() => {
    await deleteDb();
    await request(app).post(`${BACKEND_URL}/auth/register`).send(testUser);
    const loginRes = await request(app).post(`${BACKEND_URL}/auth/login`).send(testUser);
    cookie = loginRes.headers["set-cookie"];
});

afterAll(async() => {
    await deleteDb();
    await prisma.$disconnect();
});


describe("Workspace CRUD operations", () => {
    
    let workspaceId: string;
    let userId:string;
    
    beforeEach(async () => {
        // await deleteDb();
        
    });
    
    it("Should create a workspace", async () => {
        
        const user = await prisma.user.findFirst();
        userId = user?.id!;
        
        const res = await request(app).post(`${BACKEND_URL}/workspace/create`).set("Cookie", cookie!);
        workspaceId = res.body.data.id;

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

    it("Should fetch all workspaces", async () => {

        const res = await request(app).get(`${BACKEND_URL}/workspace/get-all`).set("Cookie", cookie!);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Workspaces fetched successfully");
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    name: "My Workspace",
                    userId,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    files: []
                })
            ])
        );
    });

    it("Should fetch a single workspace", async () => {

        const res = await request(app).get(`${BACKEND_URL}/workspace/get/${workspaceId}`).set("Cookie", cookie!);
        
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Workspace fetched successfully");
        expect(res.body.data).toEqual({
            id: workspaceId,
            name: "My Workspace",
            userId,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            files: []
        });
    });

    it("Should update/rename workspace", async () => {
        
        const res = await request(app).patch(`${BACKEND_URL}/workspace/update/${workspaceId}`).send({
            newName: "My New Workspace"
        }).set("Cookie", cookie!);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Workspace updated successfully");
        expect(res.body.data).toEqual({
            name: "My New Workspace",
        });
    });

    it("Should delete workspace", async () => {
        
        const res = await request(app).delete(`${BACKEND_URL}/workspace/delete/${workspaceId}`).set("Cookie", cookie!);
        
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Workspace deleted successfully");
    });
});

