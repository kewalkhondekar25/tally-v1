import { useEffect } from "react";
import useAxios from "./useAxios";
import { setUser } from "../store/features/auth/authSlice";
import { useAppDispatch } from "../store/hooks";
import { useLocation } from "react-router-dom";

const AuthProvider = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        
        const fetchAuthUser = async () => {
            try {
                const response = await useAxios({
                    method: "GET",
                    url: "/auth/me"
                });
                const email = response.data.email;
                console.log(email);
                if(email){
                    dispatch(setUser({ email}))
                }
            } catch (error: any) {
                if(error.status === 401){
                    return;
                }
                console.log("Unexpected auth error:", error);
            }
        };

        fetchAuthUser();
        
    }, [location.pathname]);

    return null;
};

export default AuthProvider;