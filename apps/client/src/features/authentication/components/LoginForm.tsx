import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthFormDataType } from "@/validations/auth.validations";
import { Loader2Icon } from "lucide-react";
import { loginService } from "../services/auth";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";
import SetCookie from "@/utils/cookie";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        formState: { errors, isSubmitting },
        setError,
        handleSubmit
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(authSchema)
    });

    const handleLogin: SubmitHandler<AuthFormDataType> = async (payload) => {
        try {
            const response = await loginService(payload);
            if (response.statusCode === 200) {
                await SetCookie(dispatch);
                toast.success(response.message);
                navigate("/dashboard");
            }
        } catch (error: any) {
            console.log(error);
            setError("root", { message: error?.response?.data?.message })
            toast.error(error?.response?.data?.message);
        }
    };

    const handleGoogleLogin = async (credentialResponse: any) => {
        try {
            const { credential } = credentialResponse;
            const res = await axios.post(import.meta.env.VITE_GOOGLE_LOGIN_URL, {
                token: credential
            }, { withCredentials: true });
            if (res.data.statusCode === 200) {
                await SetCookie(dispatch);
                toast.success("Google login success")
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
            toast.error("Google login failed");
        }
    };

    return (
        <div className="min-h-screen min-w-screen flex justify-center items-center">
            <div className="min-w-36 mx-5 flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">Welcome back</h1>
                <p className="font-semibold text-gray-400 leading-none">Get with the simplest way to create forms.</p>
                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => console.log("Google login failed")}
                />
                <div>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <Label className="my-3">Email</Label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                        {
                            errors.email && <p className="text-red-500 text-xs font-semibold">{errors.email?.message}</p>
                        }
                        <Label className="my-3">Password</Label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        {
                            errors.password && <p className="text-red-500 text-xs font-semibold">{errors.password?.message}</p>
                        }

                        <Button className="mt-5 w-full" disabled={isSubmitting}>
                            {
                                isSubmitting && <Loader2Icon className="animate-spin" />
                            }
                            Log In
                        </Button>
                    </form>
                </div>
                <div className="mt-3 text-xs text-gray-400 font-medium">
                    <p>
                        Don't have an account yet? <span><Link to="/signup" className="underline"> Sign up</Link></span>
                    </p>
                    <p>
                        Forgot password? <span className="underline"><Link to="/reset">Reset</Link></span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;