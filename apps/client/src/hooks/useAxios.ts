import axios, { AxiosError, type AxiosResponse } from "axios"

type axiosMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface axiosResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data?: any
};
interface axiosResult {
    data?: axiosResponse;
    error?: string;
    status?: number;
    message: string;
    statusCode: number;
    success: boolean;
}

const useAxios = async ({ method, url, data}: { method: axiosMethod, url: string, data?: any}): Promise<axiosResult> => {
   try {
    const baseUrl = import.meta.env.VITE_API_URL
    const response: AxiosResponse<axiosResponse> = await axios({
        method,
        url: `${baseUrl}${url}`,
        data
    });
    return response.data;
   } catch (error) {
    console.log(error);
    const err = error as AxiosError
    throw err
   } 
};

export default useAxios;