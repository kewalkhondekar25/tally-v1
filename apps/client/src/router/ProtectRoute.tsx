import { useAppSelector } from "@/store/hooks";
import { useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }: { children: JSX.Element }) => {

    const { email } = useAppSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(!email){
            navigate("/login");
        };
    }, [email, navigate]);

    return <>{children}</> 
};

export default ProtectRoute;