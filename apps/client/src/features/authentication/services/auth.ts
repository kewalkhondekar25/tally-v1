import useAxios from "@/hooks/useAxios"
import type { AuthFormDataType } from "@/validations/auth.validations";
import axios from "axios";

const signupService = async (data: AuthFormDataType) => {
    try {
        return await useAxios({
            method: "POST",
            url: "/auth/register",
            data
        });
    } catch (error) {
        console.log(error);
        throw error
    }
};

const loginService = async (data: AuthFormDataType) => {
    try {
        return await useAxios({
            method: "POST",
            url: "/auth/login",
            data
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const logoutService = async () => {
    
    const url =  import.meta.env.VITE_API_URL;

    console.log("Logging out");

    try {
        const response = await axios.post(`${url}/auth/logout`, {}, { withCredentials: true })
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { signupService, loginService, logoutService };