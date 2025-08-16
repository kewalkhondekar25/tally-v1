import useAxios from "@/hooks/useAxios"
import type { FormSubmitType } from "@repo/common/types";

const get = async (formId: string) => {
    try {
        const form = await useAxios({
            method: "GET",
            url: `/form/publish/${formId}`
        });
        console.log(form);
        return form
    } catch (error) {
        console.log(error);
        throw error
    }
};

const submit = async (payload: FormSubmitType, slug: string) => {
    try {
        const submission = await useAxios({
            method: "POST",
            url: `/form/${slug}`,
            data: payload
        });
        console.log(submission);
        return submission;
    } catch (error) {
        console.log(error);
        throw error
    }
};

export {
    get,
    submit
};