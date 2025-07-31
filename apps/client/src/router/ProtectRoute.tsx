import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {

    const user = useAppSelector(store => store.auth);
    if(!user.isUserLoaded){
        return null;
    };  
    
    if(!user.email){
        return <Navigate to="/login" replace/>
    }
    return <Outlet/>
};

export default ProtectRoute;