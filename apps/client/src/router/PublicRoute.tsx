import { Suspense } from "react";
import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2Icon } from "lucide-react";

const PublicRoute = () => {

    const user = useAppSelector(store => store.auth);
    if(!user.isUserLoaded){
        return null;
    };

    if(user.email){
        return <Navigate to="/dashboard" replace/>
    };

    return <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2Icon className="animate-spin"/></div>}>
        <Outlet/>
    </Suspense> 
};

export default PublicRoute;