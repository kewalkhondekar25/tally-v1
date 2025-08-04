import { createSlice } from "@reduxjs/toolkit";

interface WorkspaceType {
    workspaces: []
};

const initialState: WorkspaceType = {
    workspaces: []
}
const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        setWorkspaces: (state, action) => {
            state.workspaces = action.payload
        }
    }
});

export const { setWorkspaces } = workspaceSlice.actions;
export default workspaceSlice.reducer;