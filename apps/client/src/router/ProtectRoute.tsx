import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router-dom";
import { PanelLeftOpen } from "lucide-react"
import { openSidebar } from "@/store/features/sidebar/sidebarSlice";

const ProtectRoute = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(store => store.auth);
    

    if(!user.isUserLoaded){
        return null;
    };  
    
    if(!user.email){
        return <Navigate to="/login" replace/>
    }
    return(
        <div className="relative">
            <div className="p-3 w-full text-gray-400 absolute z-10">
                <PanelLeftOpen  onClick={() => dispatch(openSidebar())}/>
            </div>
            <Outlet/>
        </div>
    );
};

export default ProtectRoute;