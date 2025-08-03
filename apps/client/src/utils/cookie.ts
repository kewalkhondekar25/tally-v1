import useAxios from "@/hooks/useAxios";
import { setAuthUserIsLoading, setUser } from "@/store/features/auth/authSlice";
import type { AppDispatch } from "@/store/store";

const SetCookie = async (dispatch: AppDispatch) => {
    try {
        const response = await useAxios({
            method: "GET",
            url: "/auth/me"
        });
        const email = response.data;
        if(email){
            dispatch(setUser({ email }));
        }
    } catch (error) {
        dispatch(setAuthUserIsLoading({ isUserLoaded: true }));//to rerender
        console.log(error);
    }
};

export default SetCookie;