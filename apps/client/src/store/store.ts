import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import workspaceReducer from "./features/workspace/workspaceSlice";
import blockpickerReducer from "./features/blockpicker/blockerPickerSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        workspace: workspaceReducer,
        blockpicker: blockpickerReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;