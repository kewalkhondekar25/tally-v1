import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.
        string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[a-z]/, "Must include at least one lowercase letter")
        .regex(/[A-Z]/, "Must include at least one uppercase letter")
        .regex(/[^A-Za-z0-9]/, "Must include at least one special character")
})

export type AuthFormDataType = z.infer<typeof authSchema>;