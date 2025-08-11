import prisma from "@repo/db/client";
import { Prisma } from "@repo/db/client"
import { serviceHandler } from "../utils/serviceHandler";
import { FormSaveDataType } from "@repo/common/types";

const create = async (workspaceId: string) => {
    return await serviceHandler(async () => {
        const newForm = await prisma.file.create({
            data: {
                name: "Untitled",
                workspaceId
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
}

export { 
    create, 
    getAll, 
    get, 
    update, 
    trash, 
    save 
};