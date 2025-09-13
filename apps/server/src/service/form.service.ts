import prisma from "@repo/db/client";
import { Prisma } from "@repo/db/client"
import { serviceHandler } from "../utils/serviceHandler";
import { FormSaveDataType, FormSubmitType } from "@repo/common/types";

const create = async (workspaceId: string, slug: string) => {
    return await serviceHandler(async () => {
        const newForm = await prisma.file.create({
            data: {
                name: "Untitled",
                workspaceId,
                slug
            }
        });
        return newForm;
    });
};

const getAll = async (workspaceId: string) => {
    return await serviceHandler(async () => {
        const forms = await prisma.file.findMany({
            where: { workspaceId }
        });
        return forms;
    });
};

const get = async (formId: string) => {
    return await serviceHandler(async () => {
        const forms = await prisma.file.findUnique({
            where: { id: formId }
        });
        return forms;
    });
};

const update = async (formId: string, newName: string) => {
    return await serviceHandler(async () => {
        const updatedForm = await prisma.file.update({
            where: { id: formId },
            data: { name: newName }
        });
        return updatedForm;
    });
};

const trash = async (formId: string) => {
    return await serviceHandler(async () => {
        const deletedForm = await prisma.file.delete({
            where: { id: formId }
        });
        return deletedForm;
    });
};

const save = async (payload: FormSaveDataType) => {

    const { formId, formData, formName } = payload;
    const blocks = formData.map(item => ({
        ...item,
        formId,
        blockOptions: item.blockOptions ?? Prisma.DbNull
    }));

    return await serviceHandler(async () => {

        const [updatedFormName, count, newFormFields] = await prisma.$transaction([

            prisma.file.update({
                where: { id: formId },
                data: { name: formName }
            }),

            prisma.formFields.createMany({
                data: blocks,
            }),

            prisma.formFields.findMany({
                where: { formId }
            })

        ]);

        return {
            updatedFormName,
            count,
            newFormFields
        };
    })
};

const getPublishedForm = async (formId: string) => {

    return await serviceHandler(async () => {

        const form = await prisma.file.findUnique({
            where: { id: formId },
            include: {
                formFields: true,
            }
        });

        return form;
    });
};

const submit = async (slug: string, payload: FormSubmitType) => {

    const formId = payload.response[0]?.formId;

    return await serviceHandler(async () => {

        return await prisma.$transaction(async (tx) => {

            const response = await tx.responses.create({
                data: { formId: formId! }
            });

            const responseId = response.id;

            const data = payload.response.map(item => {
                return {
                    formFieldId: item.formFieldId,
                    responsesId: responseId,
                    answer: item.answer
                }
            });

            const { count } = await tx.fieldResponses.createMany({
                data
            });

            const file = await tx.file.findUnique({
                where: { slug },
                include: { workspaceOwner: true },
            });

            const userId = file?.workspaceOwner.userId;
            const formName = file?.name;

            //spreadsheet
            const spreadSheet = await tx.spreadSheets.findFirst({
                where: { formId }
            });
            const spreadSheetId = spreadSheet?.spreadSheetId;
            
            //notion
            const notionDb = await tx.notionDb.findFirst({
                where: { formId }
            });
            const notionDbId = notionDb?.notionDbId;

            //token
            const token = await tx.tokens.findUnique({
                where: { userId }
            });
            const spreadSheetRefreshToken = token?.googleSheetRefreshToken;
            const notionAccessToken = token?.notionAccessToken;
            const notionRefreshToken = token?.notionRefreshToken;

            return { 
                count, 
                spreadSheetRefreshToken, 
                spreadSheetId, 
                formId,
                formName,
                notionDbId,
                notionAccessToken,
                notionRefreshToken 
            };
        })
    })
};

const getFormResponse = async (formId: string) => {

    return await serviceHandler( async () => {

        const responses = await prisma.file.findUnique({
            where: { id: formId },
            include: { 
                formFields: { include: { fieldResponses: true }}
            }
        });
        
        return responses;
    });
};

const getFormIdBySlug = async (slug: string) => {

    return await serviceHandler( async () => {

        const formId = await prisma.file.findUnique({
            where: { slug },
            select: { id: true }
        });
        return formId;
    });
};

const getFormFields = async (formId: string) => {
    return await serviceHandler( async () => {
        const fields = await prisma.formFields.findMany({
            where: { formId },
            select: { blockQuestion: true }
        })
        return fields;
    });
};

const createSpreadSheet = async (formId: string, formName: string, spreadSheetId: string, spreadSheetUrl: string) => {
    return await serviceHandler( async () => {
        const res = await prisma.spreadSheets.create({
            data: {
                formId,
                formName,
                spreadSheetId,
                spreadSheetUrl
            }
        });
        return res;        
    });
};

const getSpreadSheet = async (formId: string) => {
    return await serviceHandler( async () => {
        const res = await prisma.spreadSheets.findFirst({
            where: { formId }
        });
        return res;        
    });
};

const getNotionDb = async (formId: string) => {
    return await serviceHandler( async () => {
        const res = await prisma.notionDb.findFirst({
            where: { formId }
        });
        return res;
    });
};

export {
    create,
    getAll,
    get,
    update,
    trash,
    save,
    getPublishedForm,
    submit,
    getFormResponse,
    getFormIdBySlug,
    getFormFields,
    createSpreadSheet,
    getSpreadSheet,
    getNotionDb
};