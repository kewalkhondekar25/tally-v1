import { z } from "zod"

const registerUserSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid Email"),
    password: z.string().min(3, "Password must be at least 3 characters long")
});

const loginUserSchema = z.object({
    email: z.email("Invalid Email").nonempty(),
    password: z.string().min(3, "Password must be at least 3 characters long")
});

export {
    registerUserSchema,
    loginUserSchema
}
