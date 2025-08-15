import z from "zod";
import { formSaveDataValidation } from "./validation";
import { formSubmitValidation } from "./validation";

export type FormSaveDataType = z.infer<typeof formSaveDataValidation>;
export type FormSubmitType = z.infer<typeof formSubmitValidation>;