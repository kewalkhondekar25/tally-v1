import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const SignupForm = () => {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
        <div className="min-w-36 mx-5 flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Create your Tally account</h1>
            <p className="font-semibold text-gray-400 leading-none">Get started with the simplest way to create forms.</p>
            <div>
                <form>
                    <Label className="my-3">Email</Label>
                    <Input type="email" name="email" placeholder="Enter your email" />
                    <Label className="my-3">Password</Label>
                    <Input type="password" name="email" placeholder="Create a password" />
                    <Button className="mt-5 w-full">Register</Button>
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