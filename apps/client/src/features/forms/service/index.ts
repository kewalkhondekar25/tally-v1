import useAxios from "@/hooks/useAxios";
import { type FormSaveDataType } from "@repo/common/types";

const createForm = async (workspaceId: string) => {
    try {
        const newForm = await useAxios({
            method: "POST",
            url: "/form/create",
            data: { workspaceId }
        });
        return newForm;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const saveForm = async (payload: FormSaveDataType) => {
    try {
        const savedForm = await useAxios({
            method: "POST",
            url: "/form/save",
            data: payload
        });
        console.log(savedForm);
        return savedForm
    } catch (error) {
        console.log(error);
        throw error
    }
};

const getForm = async (formId: string) => {
    try {
        const form = await useAxios({
            method: "GET",
            url: `/form/publish/${formId}`
        });
        console.log(form);
        return form;
    } catch (error) {
        console.log(error);
        throw error
    }
};

const getFormResponses = async (formId: string) => {
    try {
        const response = await useAxios({
            method: "GET",
            url: `/form/response/${formId}`,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getFormDetails = async (formId: string) => {
    try {
        const response = await useAxios({
            method: "GET",
            url: `/form/get/${formId}`,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getFormIdBySlug = async (slug: string) => {
    try {
        const res = await useAxios({
            method: "GET",
            url: `/form/get-published-form/${slug}`
        });
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { 
    createForm,
    saveForm,
    getForm,
    getFormResponses,
    getFormDetails,
    getFormIdBySlug 
};