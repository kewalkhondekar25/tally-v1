import useAxios from "@/hooks/useAxios"

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

export { createForm };