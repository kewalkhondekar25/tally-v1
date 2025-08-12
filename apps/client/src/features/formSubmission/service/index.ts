import useAxios from "@/hooks/useAxios"

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

export {
    get
};