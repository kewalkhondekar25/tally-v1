import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type authStateType = {
    email: string
};

const initialState: authStateType = {
    email: ""
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<authStateType>) => {
            state.email = action.payload.email;
        }
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;