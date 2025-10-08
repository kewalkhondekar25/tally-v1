import asyncHandler from "../utils/asyncHandler";
import * as formService from "../service/form.service";
import { apiError } from "../utils/errorHandler";
import apiResponse from "../utils/responseHandler";
import { RequestHandler } from "express";
import { generateSlug } from "../utils/slug";
import { FormSubmitType } from "@repo/common/types";
import { google } from "googleapis";

const createForm: RequestHandler = asyncHandler(async (req, res) => {

    const { workspaceId } = req.body;
    const slug: string = generateSlug();

    const newForm = await formService.create(workspaceId, slug);
    if (!newForm) {
        throw apiError("Failed to create new form", 400)
    };

    return res.status(201).json(new apiResponse(
        true,
        201,
        "Form created successfully",
        newForm
    ));
});

const getAllForms: RequestHandler = asyncHandler(async (req, res) => {

    const { workspaceId } = req.params;
    if (!workspaceId) {
        throw apiError("Workspace id not provided in params", 404);
    };

    const forms = await formService.getAll(workspaceId);
    if (!forms) {
        throw apiError("Failed to fetch all forms", 404)
    };

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Forms fetched successfully",
        forms
    ));
});

const getForm: RequestHandler = asyncHandler(async (req, res) => {

    const { formId } = req.params;
    if (!formId) {
        throw apiError("Form id not provided in params", 404);
    }

    const form = await formService.get(formId);
    if (!form) {
        throw apiError("Failed to fetch form", 404);
    }

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Form fetched successfully",
        form
    ));
});

const updateForm: RequestHandler = asyncHandler(async (req, res) => {

    const { formId } = req.params;
    const { newName } = req.body;

    if (!formId) {
        throw apiError("Form id not provided in params", 404);
    }

    const updatedForm = await formService.update(formId, newName);
    if (!updatedForm) {
        throw apiError("Failed to update form", 404)
    }

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Form updated successfully",
        updatedForm
    ));
});

const deleteForm: RequestHandler = asyncHandler(async (req, res) => {

    const { formId } = req.params;
    if (!formId) {
        throw apiError("Form id not provided in params", 404);
    }

    const deletedForm = await formService.trash(formId);
    if (!deletedForm) {
        throw apiError("Failed to delete form", 404)
    }

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Form deleted successfully"
    ));
});

const saveForm: RequestHandler = asyncHandler(async (req, res) => {

    const payload = req.body;

    const savedForm = await formService.save(payload);

    if (savedForm.count.count < 1) {
        throw apiError("Failed to save form fields", 500)
    }

    return res.status(201).json(new apiResponse(
        true,
        201,
        "Form saved successfully",
        savedForm
    ))
});

const getPublishForm: RequestHandler = asyncHandler(async (req, res) => {

    const { formId } = req.params;

    if (!formId) {
        throw apiError("Form Id params not found", 404);
    }

    const form = await formService.getPublishedForm(formId);
    if (!form) {
        throw apiError("Published form not found", 404)
    };

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Published form fetched successfully",
        form
    ));
});

const submitForm: RequestHandler = asyncHandler(async (req, res) => {

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_SHEET_CLIENT_ID,
        process.env.GOOGLE_SHEET_CLIENT_SECRET,
        process.env.GOOGLE_SHEET_REDIRECT_URI
    );

    const payload: FormSubmitType = req.body;
    const { slug } = req.params;

    if (!slug) {
        throw apiError("Slug not found is params", 404);
    };

    const submission = await formService.submit(slug, payload);
    if (!submission.count || submission.count < 1) {
        throw apiError("Failed to submit form", 500);
    };

    //spread sheet append
    if (submission.spreadSheetRefreshToken && submission.spreadSheetId) {

        oauth2Client.setCredentials({ refresh_token: submission.spreadSheetRefreshToken });

        const sheets = google.sheets({ version: "v4", auth: oauth2Client });

        await sheets.spreadsheets.values.append({
            spreadsheetId: submission.spreadSheetId,
            range: "Responses!A1",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [payload.response.map(item => 
                    Array.isArray(item?.answer) ? item.answer.join(", ") : item.answer
                )]
            }
        })

    };

    //append notion db
    if (submission.notionAccessToken && submission.notionDbId) {

        //get formfields
        const questions = await formService.getFormFields(submission.formId!);
        const notionAppendData = questions.map(item1 => {
            return {
                [item1.blockQuestion]: {
                    rich_text: payload.response.map(item2 => {
                        return [{ text: { content: item2.answer } }]
                    })
                }
            }
        })

        const response = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${submission.notionAccessToken}`,
                "Content-Type": "application/json",
                "Notion-Version": "2025-09-03",
            },
            body: JSON.stringify({
                parent: { database_id: submission.notionDbId },
                properties: Object.fromEntries(
                    questions.map((q, i) => {
                        const isTitle = i === 0;
                        return [
                            q.blockQuestion,
                            isTitle
                                ? {
                                    title: [
                                        {
                                            text: {
                                                content: String(payload.response[i]?.answer ?? ""),
                                            },
                                        },
                                    ],
                                }
                                : {
                                    rich_text: [
                                        {
                                            text: {
                                                content: String(payload.response[i]?.answer ?? ""),
                                            },
                                        },
                                    ],
                                },
                        ];
                    })
                ),
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            console.log("Failed to save data in notion");
        }
    }

    return res.status(201).json(new apiResponse(
        true,
        201,
        "Form submitted successfully"
    ));
});

const getFormResponse: RequestHandler = asyncHandler(async (req, res) => {

    const { formId } = req.params;
    if (!formId) {
        throw apiError("No form Id found in params", 404);
    };

    const formResponse = await formService.getFormResponse(formId);
    if (!formResponse) {
        throw apiError("Failed to fetched form responses", 500)
    };

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Form responses fetched successfully",
        formResponse
    ));
});

const getPublishSlugForm: RequestHandler = asyncHandler(async (req, res) => {

    const { slug } = req.params;
    if (!slug) {
        throw apiError("Slug missing in params", 404);
    };

    const formId = await formService.getFormIdBySlug(slug);
    if (!formId) {
        throw apiError("No form found for provided slug", 404);
    }

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Form Id fetched successfully",
        formId
    ));
});

const getSpreadSheet: RequestHandler = asyncHandler(async (req, res) => {

    const { formId } = req.params;
    const spreadSheetData = await formService.getSpreadSheet(formId!);

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Spreadsheet fetched successfully",
        spreadSheetData
    ));
});

const getNotionDb: RequestHandler = asyncHandler(async (req, res) => {

    const { formId } = req.params;
    const notionDbData = await formService.getNotionDb(formId!);

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Spreadsheet fetched successfully",
        notionDbData
    ));
});

export {
    createForm,
    getAllForms,
    getForm,
    updateForm,
    deleteForm,
    saveForm,
    getPublishForm,
    submitForm,
    getFormResponse,
    getPublishSlugForm,
    getSpreadSheet,
    getNotionDb
};