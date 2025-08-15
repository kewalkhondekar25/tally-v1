import dotenv from "dotenv";
dotenv.config();
import prisma from "@repo/db/client";
import request from "supertest";
import app from "../app";

const BACKEND_URL = "/api/v1";

const testUser = {
    email: "walter.white@breakingbad.com",
    password: "Heisenberg"
};

const deleteDB = async () => {
    await prisma.file.deleteMany();
    await prisma.workspace.deleteMany();
    await prisma.user.deleteMany();
};

let cookie: string | undefined;

beforeAll(async () => {
    await deleteDB();
    await request(app).post(`${BACKEND_URL}/auth/register`).send(testUser);
    const res = await request(app).post(`${BACKEND_URL}/auth/login`).send(testUser);
    cookie = res.headers["set-cookie"];
});

afterAll(async () => {
    await deleteDB();
    prisma.$disconnect();
});

describe("Create a workspace and form", () => {

    let userId: string;
    let workspaceId: string;
    let formId: string;

    it("Should create a workspace", async () => {

        const user = await prisma.user.findFirst();
        userId = user?.id!;

        const res = await request(app).post(`${BACKEND_URL}/workspace/create`).set("Cookie", cookie!);
        workspaceId = res.body.data.id;

        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Workspace created successfully");
        expect(res.body.data).toEqual({
            id: workspaceId,
            name: "My Workspace",
            userId,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            files: []
        });
    });

    it("Should create a form in workspace", async () => {

        const res = await request(app).post(`${BACKEND_URL}/form/create`).send({ workspaceId }).set("Cookie", cookie!);
        formId = res.body.data.id;

        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Form created successfully");
        expect(res.body.data).toEqual({
            id: formId,
            name: "Untitled",
            workspaceId,
            slug: expect.stringMatching(/^[A-Za-z]{7}$/),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        })
    });

    it("Should fetch all form from a workspace", async () => {

        const res = await request(app).get(`${BACKEND_URL}/form/get-all/${workspaceId}`).set("Cookie", cookie!);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Forms fetched successfully");
        expect(res.body.data).toMatchObject([
            expect.objectContaining({
                id: formId,
                name: "Untitled",
                workspaceId,
                slug: expect.stringMatching(/^[A-Za-z]{7}$/),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            })
        ]);

    });

    it("Should fetch a single form", async () => {

        const res = await request(app).get(`${BACKEND_URL}/form/get/${formId}`).set("Cookie", cookie!);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Form fetched successfully");
        expect(res.body.data).toMatchObject({
            id: formId,
            name: "Untitled",
            workspaceId,
            slug: expect.stringMatching(/^[A-Za-z]{7}$/),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        });
    });

    it("Should update a form details", async () => {

        const res = await request(app).patch(`${BACKEND_URL}/form/${formId}`).send({
            newName: "Registration form"
        }).set("Cookie", cookie!);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Form updated successfully");
        expect(res.body.data).toMatchObject({
            id: formId,
            name: "Registration form",
            workspaceId,
            slug: expect.stringMatching(/^[A-Za-z]{7}$/),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        });
    });

    it("Should delete a form", async () => {

        const res = await request(app).delete(`${BACKEND_URL}/form/${formId}`).set("Cookie", cookie!);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Form deleted successfully");
    });
});