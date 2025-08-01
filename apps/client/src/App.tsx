import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import { Signup, Login} from "./pages/Signup";
import { Toaster } from "@/components/ui/sonner"
import ProtectRoute from './router/ProtectRoute';
import Dashboard from './pages/Dashboard';
import setCookie from './utils/cookie';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import PublicRoute from './router/PublicRoute';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  
  const dispatch = useAppDispatch();
  const { isSidebarOpen } =  useAppSelector(state => state.sidebar);
  
  useEffect(() => {
    const fetchUser = async () => {
      await setCookie(dispatch);
    };
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <div className='relative'>
        <div className="absolute z-20">
          { isSidebarOpen && <Sidebar/>}
        </div>
        <div className=''> 
          <Routes>
            <Route element={<PublicRoute/>}>
              <Route path='/' element={<Landing/>} />
            </Route>
            <Route element={<PublicRoute/>}>
              <Route path='/signup' element={<Signup/>} />
            </Route>
            <Route element={<PublicRoute/>}>
              <Route path='/login' element={<Login/>} />
            </Route>
            <Route element={<ProtectRoute/>}>
              <Route path='dashboard' element={<Dashboard/>}/>
            </Route>
            <Route path='*' element={<h3>Route Not Found</h3>}/>
        </Routes>
        </div>
      </div>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
