import dotenv from "dotenv";
dotenv.config();
import prisma from "@repo/db/client";
import request from "supertest";
import app from "../app";
import { testUser } from "../utils/test";

const BACKEND_URL = "/api/v1";

const deleteDb = async () => {
    await prisma.fieldResponses.deleteMany();
    await prisma.responses.deleteMany();
    await prisma.formFields.deleteMany();
    await prisma.file.deleteMany();
    await prisma.workspace.deleteMany();
    await prisma.user.deleteMany();
};

let cookie: string | undefined;
type FormDataType = {
    blockId: number;
    blockName: string;
    blockIndex: number;
    blockQuestion: string;
    blockPlaceholder?: string;
    blockOptions?: string[]
};

beforeAll(async () => {
    await deleteDb();
    await request(app).post(`${BACKEND_URL}/auth/register`).send(testUser);
    const res = await request(app).post(`${BACKEND_URL}/auth/login`).send(testUser);
    cookie = res.headers["set-cookie"];
});

afterAll(async () => {
    await deleteDb();
    await prisma.$disconnect();
});

describe("Add blocks into form & publish", () => {

    let workspaceId: string;
    let formId: string;
    let formData: FormDataType[] = [{
        blockId: 1,
        blockName: "short answer",
        blockIndex: 1,
        blockQuestion: "First Name",
        blockPlaceholder: "Enter your first name"
    }];
    let slug: string;

    beforeEach(async () => {
        const workspaceRes = await request(app).post(`${BACKEND_URL}/workspace/create`).set("Cookie", cookie!);
        workspaceId = workspaceRes.body.data.id;
        const formRes = await request(app).post(`${BACKEND_URL}/form/create`).send({ workspaceId }).set("Cookie", cookie!);
        formId = formRes.body.data.id;
    });

    afterEach(async () => {
        await prisma.fieldResponses.deleteMany();
        await prisma.responses.deleteMany();
        await prisma.formFields.deleteMany();
        await prisma.file.deleteMany();
        await prisma.workspace.deleteMany();
    });

    it("Should save form name & add short answer block in form", async () => {

        const res = await request(app).post(`${BACKEND_URL}/form/save`).send({
            formId,
            formName: "Register",
            formData
        }).set("Cookie", cookie!);

        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Form saved successfully");
        expect(res.body.data).toEqual({
            updatedFormName: expect.objectContaining({
                id: formId,
                workspaceId,
                name: "Register",
                slug: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }),
            count: expect.objectContaining({
                count: expect.any(Number)
            }),
            newFormFields: expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    formId,
                    blockId: expect.any(Number),
                    blockName: "short answer",
                    blockIndex: expect.any(Number),
                    blockQuestion: "First Name",
                    blockPlaceholder: "Enter your first name",
                    blockOptions: null,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
            ])
        });

    });

    formData.push(
        {
            blockId: 2,
            blockName: "checkboxes",
            blockIndex: 2,
            blockQuestion: "City",
            blockOptions: ["Pune", "Mumbai"]
        },
        {
            blockId: 3,
            blockName: "dropdown",
            blockIndex: 3,
            blockQuestion: "Technology",
            blockOptions: ["React", "Angular"]
        }
    );

    it("Should save form name, add - short answer, checkbox, dropdown ", async () => {

        const res = await request(app).post(`${BACKEND_URL}/form/save`).send({
            formId,
            formName: "Register",
            formData,
        }).set("Cookie", cookie!);

        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Form saved successfully");
        expect(res.body.data).toEqual({
            updatedFormName: expect.objectContaining({
                id: formId,
                workspaceId,
                name: "Register",
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }),
            count: expect.objectContaining({
                count: expect.any(Number)
            }),
            newFormFields: [
                expect.objectContaining({
                    id: expect.any(String),
                    formId,
                    blockId: expect.any(Number),
                    blockName: "short answer",
                    blockIndex: expect.any(Number),
                    blockQuestion: "First Name",
                    blockPlaceholder: "Enter your first name",
                    blockOptions: null,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                }),
                expect.objectContaining({
                    id: expect.any(String),
                    formId,
                    blockId: expect.any(Number),
                    blockName: "checkboxes",
                    blockIndex: expect.any(Number),
                    blockQuestion: "City",
                    blockPlaceholder: null,
                    blockOptions: ["Pune", "Mumbai"],
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                }),
                expect.objectContaining({
                    id: expect.any(String),
                    formId,
                    blockId: expect.any(Number),
                    blockName: "dropdown",
                    blockIndex: expect.any(Number),
                    blockQuestion: "Technology",
                    blockPlaceholder: null,
                    blockOptions: ["React", "Angular"],
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                }),
            ]
        });
    });

    it("Should fetch published form using form Id", async () => {

        let fId: string;
        let fName: string;

        const res = await request(app).post(`${BACKEND_URL}/form/save`).send({
            formId,
            formName: "Register",
            formData,
        }).set("Cookie", cookie!);

        fId = res.body.data.updatedFormName.id;
        fName = res.body.data.updatedFormName.name;

        const publishRes = await request(app).get(`${BACKEND_URL}/form/publish/${formId}`).set("Cookie", cookie!);

        expect(publishRes.status).toBe(200);
        expect(publishRes.body.message).toBe("Published form fetched successfully");
        expect(publishRes.body.data).toEqual(
            expect.objectContaining({
                id: fId,
                name: fName,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                formFields: [
                    expect.objectContaining({
                        id: expect.any(String),
                        formId: fId,
                        blockId: expect.any(Number),
                        blockName: "short answer",
                        blockIndex: 1,
                        blockQuestion: "First Name",
                        blockPlaceholder: "Enter your first name",
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    }),
                    expect.objectContaining({
                        id: expect.any(String),
                        formId: fId,
                        blockId: expect.any(Number),
                        blockName: "checkboxes",
                        blockIndex: 2,
                        blockQuestion: "City",
                        blockPlaceholder: null,
                        blockOptions: ["Pune", "Mumbai"],
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    }),
                    expect.objectContaining({
                        id: expect.any(String),
                        formId: fId,
                        blockId: expect.any(Number),
                        blockName: "dropdown",
                        blockIndex: 3,
                        blockQuestion: "Technology",
                        blockPlaceholder: null,
                        blockOptions: ["React", "Angular"],
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    })
                ]
            })
        )
    });

    it("Should fetch published form using slug", async () => {

        let fId: string;
        let fName: string;

        const res = await request(app).post(`${BACKEND_URL}/form/save`).send({
            formId,
            formName: "Register",
            formData,
        }).set("Cookie", cookie!);

        fId = res.body.data.updatedFormName.id;
        fName = res.body.data.updatedFormName.name;
        slug = res.body.data.updatedFormName.slug;

        const fetchedFormId = await request(app).get(`${BACKEND_URL}/form/get-published-form/${slug}`)
        .set("Cookie", cookie!);
        
        const fetchedFormIdBySlug = fetchedFormId.body.data.id;

        const publishRes = await request(app).get(`${BACKEND_URL}/form/publish/${fetchedFormIdBySlug}`)
        .set("Cookie", cookie!);

        expect(publishRes.status).toBe(200);
        expect(publishRes.body.message).toBe("Published form fetched successfully");
        expect(publishRes.body.data).toEqual(
            expect.objectContaining({
                id: fId,
                name: fName,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                formFields: [
                    expect.objectContaining({
                        id: expect.any(String),
                        formId: fId,
                        blockId: expect.any(Number),
                        blockName: "short answer",
                        blockIndex: 1,
                        blockQuestion: "First Name",
                        blockPlaceholder: "Enter your first name",
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    }),
                    expect.objectContaining({
                        id: expect.any(String),
                        formId: fId,
                        blockId: expect.any(Number),
                        blockName: "checkboxes",
                        blockIndex: 2,
                        blockQuestion: "City",
                        blockPlaceholder: null,
                        blockOptions: ["Pune", "Mumbai"],
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    }),
                    expect.objectContaining({
                        id: expect.any(String),
                        formId: fId,
                        blockId: expect.any(Number),
                        blockName: "dropdown",
                        blockIndex: 3,
                        blockQuestion: "Technology",
                        blockPlaceholder: null,
                        blockOptions: ["React", "Angular"],
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    })
                ]
            })
        )
    })
});