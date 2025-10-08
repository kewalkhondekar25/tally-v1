import { createSlice } from "@reduxjs/toolkit";

interface WorkspaceType {
    workspaces: [],
    isLoading: boolean
};

const initialState: WorkspaceType = {
    workspaces: [],
    isLoading: false
}
const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        setWorkspaces: (state, action) => {
            state.workspaces = action.payload
        },
        setIsLoading: (state) => {
            state.isLoading = !state.isLoading
        }
    }
});

export const { setWorkspaces, setIsLoading } = workspaceSlice.actions;
export default workspaceSlice.reducer;