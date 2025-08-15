import { z } from "zod"

const registerUserSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid Email"),
    password: z.string().min(3, "Password must be at least 3 characters long")
});

const loginUserSchema = z.object({
    email: z.email("Invalid Email").nonempty(),
    password: z.string().min(3, "Password must be at least 3 characters long")
});

const formSaveDataValidation = z.object({
    // workspaceId: z.string().nonempty("Workspace id is required"),
    formId: z.string().nonempty("Form id is required"),
    formName: z.string().nonempty("Form name is required"),
    formData: z.array(
        z.object({
            blockId: z.number().int().min(0, "Block ID must be a positive number"),
            blockName: z.string().nonempty("Block name is required"),
            blockIndex: z.number().int().min(0, "Block Index must be a positive number"),
            blockQuestion: z.string().nonempty("Field question is required"),
            blockPlaceholder: z.string().optional(),
            // blockOptions: z.array(z.string()).optional()
            blockOptions: z.array(z.string()).nullable().optional()
        })
    ) 
});

const formSubmitValidation = z.object({
    response: z.array(
        z.object({
            answer: z.union([
                z.string(),
                z.number(),
                z.array(z.string())
            ]),
            formFieldId: z.string().nonempty("Form field Id is required"),
            formId: z.string().nonempty("Form Id is required"),
        })
    )
});

export {
    registerUserSchema,
    loginUserSchema,
    formSaveDataValidation,
    formSubmitValidation
}
