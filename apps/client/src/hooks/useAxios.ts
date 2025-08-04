import axios, { AxiosError, type AxiosResponse } from "axios"

type axiosMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface ApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data?: any;
};

interface AxiosParams {
    method: axiosMethod;
    url: string;
    data?: any;
    params?: Record<string, any>;
};

const useAxios = async ({ method, url, data, params}: AxiosParams): Promise<ApiResponse> => {
   try {
    const baseUrl = import.meta.env.VITE_API_URL
    const response: AxiosResponse<ApiResponse> = await axios({
        method,
        url: `${baseUrl}${url}`,
        data,
        params,
        withCredentials: true
    });
    return response.data;
   } catch (error) {
    console.log(error);
    const err = error as AxiosError
    throw err
   } 
};

export default useAxios;