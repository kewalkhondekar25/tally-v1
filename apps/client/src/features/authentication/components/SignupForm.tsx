import type React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, Snowflake } from "lucide-react";
import { signupService } from "../services/auth";
import { toast } from "sonner"
import { authSchema, type AuthFormDataType } from "@/validations/auth.validations";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import SetCookie from "@/utils/cookie";
import { useAppDispatch } from "@/store/hooks";

const SignupForm: React.FC = () => {
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { 
        register, 
        formState: { errors, isSubmitting, }, 
        handleSubmit,
        setError 
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(authSchema)
    });

    const handleSignUp: SubmitHandler<AuthFormDataType> = async (payload) => {
        try {
            const response = await signupService(payload);
            if(response.statusCode === 201){
                toast.success(response?.message);
                navigate("/login")
            }
        } catch (error: any) {
            console.log(error);
            setError("root", { message: error?.response?.data?.message});
            toast.error(error?.response?.data?.message);
        }
    };

    const handleGoogleLogin  = async (credentialResponse: any) => {
        try {
            console.log(import.meta.env.VITE_GOOGLE_LOGIN_URL);
            
            const { credential } = credentialResponse;
            const res = await axios.post(import.meta.env.VITE_GOOGLE_LOGIN_URL, {
                token: credential
            }, { withCredentials: true });
            if(res.data.statusCode === 200){
                await SetCookie(dispatch);
                toast.success("Google login success")
                navigate("/dashboard");
            }
            console.log("user", res.data.user);
        } catch (error) {
            console.log(error);
            toast.error("Google login failed");
        }
    };

    return (
        <div className="min-h-screen min-w-screen flex justify-center items-center">
            <div className="min-w-36 mx-5 flex flex-col gap-3">
                <Link to="/">
                    <Snowflake/>
                </Link>
                <h1 className="text-2xl font-semibold">Create your Typely account</h1>
                <p className="font-semibold text-gray-400 leading-none">Get started with the simplest way to create forms.</p>
                <GoogleLogin 
                    onSuccess={handleGoogleLogin}
                    onError={() => console.log("Google login failed")}
                />    
                <div>
                    <form onSubmit={handleSubmit(handleSignUp)}>
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
                            placeholder="Create a password"
                            {...register("password")}
                        />
                        
                        {
                            errors.password && <p className="text-red-500 text-xs font-semibold">{errors.password?.message}</p>
                        }

                        <Button className="mt-5 w-full cursor-pointer" disabled={isSubmitting}>
                            {
                                isSubmitting && <Loader2Icon className="animate-spin" />
                            }
                            Register
                        </Button>
                    </form>
                </div>
                <div className="mt-3 text-xs text-gray-400 font-medium">
                    <p>
                        By signing up, you agree to our <span className="underline">Terms & Privacy</span>
                    </p>
                    <p>
                        Already have an account? <span><Link to="/login" className="underline"> Log in</Link></span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;