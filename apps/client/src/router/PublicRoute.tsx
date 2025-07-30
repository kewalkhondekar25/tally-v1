import { useAppSelector } from "@/store/hooks";
import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {

    const { email } = useAppSelector(store => store.auth);
    const navigate = useNavigate();
    console.log(navigate);

    useEffect(() => {
        if(email){
            navigate("/dashboard");
        };
    }, [email, navigate]);

    return <>{children}</>
};

export default PublicRoute;