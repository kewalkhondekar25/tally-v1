import asyncHandler from "../utils/asyncHandler";
import * as formService from "../service/form.service";
import { apiError } from "../utils/errorHandler";
import apiResponse from "../utils/responseHandler";
import { RequestHandler } from "express";
import { generateSlug } from "../utils/slug";

const createForm: RequestHandler = asyncHandler( async (req, res) => {

    const { workspaceId } = req.body;
    const slug: string = generateSlug();

    const newForm = await formService.create(workspaceId, slug); 
    if(!newForm){
        throw apiError("Failed to create new form", 400)
    };

    return res.status(201).json(new apiResponse(
        true,
        201,
        "Form created successfully",
        newForm
    ));
});

const getAllForms: RequestHandler = asyncHandler( async (req, res) => {

    const { workspaceId } = req.params;
    if(!workspaceId){
        throw apiError("Workspace id not provided in params", 404);
    };

    const forms = await formService.getAll(workspaceId);
    if(!forms){
        throw apiError("Failed to fetch all forms", 404)
    };

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Forms fetched successfully",
        forms
    ));
});

const getForm: RequestHandler = asyncHandler (async (req, res) => {

    const { formId } = req.params;
    if(!formId){
        throw apiError("Form id not provided in params", 404);
    }

    const form = await formService.get(formId);
    if(!form){
        throw apiError("Failed to fetch form", 404);
    }

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Form fetched successfully",
        form
    ));
});

const updateForm: RequestHandler = asyncHandler( async (req, res) => {

    const { formId } = req.params;
    const { newName } = req.body;

    if(!formId){
        throw apiError("Form id not provided in params", 404);
    }

    const updatedForm = await formService.update(formId, newName);
    if(!updatedForm){
        throw apiError("Failed to update form", 404)
    }

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Form updated successfully",
        updatedForm
    ));
});

const deleteForm: RequestHandler = asyncHandler( async (req, res) => {

    const { formId } = req.params;
    if(!formId){
        throw apiError("Form id not provided in params", 404);
    }

    const deletedForm = await formService.trash(formId);
    if(!deletedForm){
        throw apiError("Failed to delete form", 404)
    }

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Form deleted successfully"
    ));
});

const saveForm: RequestHandler = asyncHandler ( async (req, res) => {
    
    const payload = req.body;
    
    const savedForm = await formService.save(payload);
    
    if(savedForm.count.count < 1){
        throw apiError("Failed to save form fields", 500)
    }

    return res.status(201).json(new apiResponse(
        true,
        201,
        "Form saved successfully",
        savedForm
    ))
});

const getPublishForm: RequestHandler = asyncHandler ( async (req, res) => {

    const { formId } = req.params;
    
    if(!formId){
        throw apiError("Form Id params not found", 404);
    }

    const form = await formService.getPublishedForm(formId);
    if(!form){
        throw apiError("Published form not found", 404)
    };

    return res.status(200).json(new apiResponse(
        true,
        200,
        "Published form fetched successfully",
        form
    ));
});

const submitForm: RequestHandler = asyncHandler ( async (req, res) => {

    const payload = req.body;
    const { slug } = req.params;

    if(!slug){
        throw apiError("Slug not found is params", 404);
    };

    const count = await formService.submit(slug, payload);
    if(!count || count < 1 ){
        throw apiError("Failed to submit form", 500);
    }

    return res.status(201).json(new apiResponse(
        true,
        201,
        "Form submitted successfully"
    ));
});

const getFormResponse: RequestHandler = asyncHandler ( async (req, res) => {

    const { formId } = req.params;
    if(!formId){
        throw apiError("No form Id found in params", 404);
    };

    const formResponse = await formService.getFormResponse(formId);
    if(!formResponse){
        throw apiError("Failed to fetched form responses", 500)
    };
    
    return res.status(200).json(new apiResponse(
        true,
        200,
        "Form responses fetched successfully",
        formResponse
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
    getFormResponse 
};