import z from "zod";
import { formSaveDataValidation } from "./validation";

export type FormSaveDataType = z.infer<typeof formSaveDataValidation>;