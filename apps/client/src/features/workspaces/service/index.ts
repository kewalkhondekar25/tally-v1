import useAxios from "@/hooks/useAxios"

const create = async () => {
    try {
        const response = await useAxios({
            method: "POST",
            url: "/workspace/create"
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getAllWorkspaces = async () => {
    try {
        const workspaces = await useAxios({
            method: "GET",
            url: "/workspace/get-all",
        });
        console.log("workspaces", workspaces);
        return workspaces
    } catch (error) {
        console.log(error);
        throw error
    }
};

const deleteWorkspace = async (workspaceId: string) => {
    try {
        const deletedWorkspace = await useAxios({
            method: "DELETE",
            url: `/workspace/delete/${workspaceId}`,
        });
        return deletedWorkspace;
    } catch (error) {
        console.log(error);
        throw error
    }
};

export { create, getAllWorkspaces, deleteWorkspace };