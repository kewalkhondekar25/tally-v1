import useAxios from "@/hooks/useAxios"
import type { AuthFormDataType } from "@/validations/auth.validations";

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

export { signupService, loginService };