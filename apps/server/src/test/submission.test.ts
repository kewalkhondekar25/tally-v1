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
type FormDataResponseType = FormDataType & {
    id: string;
    formId: string;
    createdAt: Date;
    updatedAt: Date;
};

type SubmitDataType = {
    answer: number | string | string[];
    formFieldId: string;
    formId: string;
};

let formData: FormDataType[] = [
    {
        blockId: 1,
        blockName: "short answer",
        blockIndex: 1,
        blockQuestion: "Full Name",
        blockPlaceholder: "Enter your first name"
    },
    {
        blockId: 2,
        blockName: "long answer",
        blockIndex: 2,
        blockQuestion: "Biography",
        blockPlaceholder: "Tell us about yourself"
    },
    {
        blockId: 3,
        blockName: "checkboxes",
        blockIndex: 3,
        blockQuestion: "Prefered Cities",
        blockPlaceholder: "Enter your preferences",
        blockOptions: ["Pune", "Mumbai", "Benguluru"]
    },
    {
        blockId: 4,
        blockName: "dropdown",
        blockIndex: 4,
        blockQuestion: "Prefered Technology",
        blockPlaceholder: "Enter prefered technology",
        blockOptions: ["React", "Nodejs"]
    },
    {
        blockId: 5,
        blockName: "number",
        blockIndex: 5,
        blockQuestion: "Age",
        blockPlaceholder: "Enter your age",
    },
    {
        blockId: 6,
        blockName: "phone",
        blockIndex: 6,
        blockQuestion: "Contact Details",
        blockPlaceholder: "Enter your mobile no",
    },
    {
        blockId: 7,
        blockName: "link",
        blockIndex: 7,
        blockQuestion: "Portfolio",
        blockPlaceholder: "Enter your github link",
    },
    {
        blockId: 8,
        blockName: "email",
        blockIndex: 8,
        blockQuestion: "Email Address",
        blockPlaceholder: "Enter your email",
    },
    {
        blockId: 9,
        blockName: "date",
        blockIndex: 9,
        blockQuestion: "Prefered Date",
        blockPlaceholder: "Enter prefered date",
    },
];
let submitData: SubmitDataType[] = [
    {
        answer: "jesse pinkman",
        formFieldId: "",
        formId: ""
    },
    {
        answer: "i cook meth",
        formFieldId: "",
        formId: ""
    },
    {
        answer: ["Pune", "Mumbai", "Benguluru"],
        formFieldId: "",
        formId: ""
    },
    {
        answer: "React",
        formFieldId: "",
        formId: ""
    },
    {
        answer: 27,
        formFieldId: "",
        formId: ""
    },
    {
        answer: 9999999999,
        formFieldId: "",
        formId: ""
    },
    {
        answer: "https://kewalkhondekar.dev",
        formFieldId: "",
        formId: ""
    },
    {
        answer: "kewalkhondekar@gmail.com",
        formFieldId: "",
        formId: ""
    },
    {
        answer: "1998-06-24T18:30:00.000Z",
        formFieldId: "",
        formId: ""
    },

]
beforeAll(async () => {
    await deleteDb();
    await request(app).post(`${BACKEND_URL}/auth/register`).send(testUser);
    const res = await request(app).post(`${BACKEND_URL}/auth/login`).send(testUser);
    cookie = res.headers["set-cookie"];
});

afterAll(async () => {
    await deleteDb();
    prisma.$disconnect();
});

describe("Form Submission", () => {

    let workspaceId: string;
    let formId: string;
    let slug: string;

    beforeEach(async () => {

        const workspaceRes = await request(app).post(`${BACKEND_URL}/workspace/create`).set("Cookie", cookie!);
        workspaceId = workspaceRes.body.data.id;

        const formRes = await request(app).post(`${BACKEND_URL}/form/create`).send({ workspaceId }).set("Cookie", cookie!);
        formId = formRes.body.data.id;

        const res = await request(app).post(`${BACKEND_URL}/form/save`).send({
            formId,
            formName: "Hackathon Registration",
            formData
        }).set("Cookie", cookie!);

        slug = res.body.data.updatedFormName.slug;
        res.body.data.newFormFields.map((item: FormDataResponseType, i: number) => {
            submitData[i]!.formFieldId = item.id;
            submitData[i]!.formId = formId;
        });
    });

    afterEach(async () => {
        await deleteDb()
    });

    it("should submit a response", async () => {

        console.log("token", cookie);
        const res = await request(app).post(`${BACKEND_URL}/form/${slug}`).send({ response: submitData }).set("Cookie", cookie!);

        const submissions = await prisma.fieldResponses.findMany();
        console.log("submissions", submissions);

        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Form submitted successfully");
    });

    it("Should fetch all submited responses", async () => {

        await request(app).post(`${BACKEND_URL}/form/${slug}`).send({ response: submitData }).set("Cookie", cookie!);

        const res = await request(app).get(`${BACKEND_URL}/form/response/${formId}`).set("Cookie", cookie!);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Form responses fetched successfully");

        expect(res.body.data).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: expect.any(String),
                slug: expect.any(String),
                workspaceId: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                formFields: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(String),
                        formId: expect.any(String),
                        blockId: expect.any(Number),
                        blockName: expect.any(String),
                        blockIndex: expect.any(Number),
                        blockQuestion: expect.any(String),
                        blockPlaceholder: expect.anything(),
                        blockOptions: expect.anything(),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        fieldResponses: expect.arrayContaining([
                            expect.objectContaining({
                                id: expect.any(String),
                                formFieldId: expect.any(String),
                                responsesId: expect.any(String),
                                answer: expect.anything(),
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                            })
                        ])
                    })
                ])
            })
        )
    })
});