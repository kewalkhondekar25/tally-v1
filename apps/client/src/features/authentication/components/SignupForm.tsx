import type React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { signupService } from "../services/auth";
import { toast } from "sonner"
import { authSchema, type AuthFormDataType } from "@/validations/auth.validations";

const SignupForm: React.FC = () => {

    const navigate = useNavigate();

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
                toast(response?.message);
                navigate("/login")
            }
        } catch (error: any) {
            console.log(error);
            setError("root", { message: error?.response?.data?.message});
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div className="min-h-screen min-w-screen flex justify-center items-center">
            <div className="min-w-36 mx-5 flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">Create your Tally account</h1>
                <p className="font-semibold text-gray-400 leading-none">Get started with the simplest way to create forms.</p>
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

                        <Button className="mt-5 w-full" disabled={isSubmitting}>
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