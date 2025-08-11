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

export { 
    createForm,
    saveForm 
};