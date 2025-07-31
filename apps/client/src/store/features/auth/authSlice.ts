import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type authStateType = {
    email: string;
    isUserLoaded: boolean
};

const initialState: authStateType = {
    email: "",
    isUserLoaded: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ email: string }>) => {
            state.email = action.payload.email;
            state.isUserLoaded = true;
        },
        setAuthUserIsLoading: (state, action: PayloadAction<{ isUserLoaded: boolean }>) => {
            state.isUserLoaded = action.payload.isUserLoaded;
        }
    }
});

export const { setUser, setAuthUserIsLoading } = authSlice.actions;
export default authSlice.reducer;