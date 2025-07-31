import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {

    const user = useAppSelector(store => store.auth);
    if(!user.isUserLoaded){
        return null;
    };

    if(user.email){
        return <Navigate to="/dashboard" replace/>
    };

    return <Outlet/>
};

export default PublicRoute;