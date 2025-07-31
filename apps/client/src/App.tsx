import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import { Signup, Login} from "./pages/Signup";
import { Toaster } from "@/components/ui/sonner"
import ProtectRoute from './router/ProtectRoute';
import Dashboard from './pages/Dashboard';
import setCookie from './utils/cookie';
import { useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import PublicRoute from './router/PublicRoute';


function App() {
  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const fetchUser = async () => {
      await setCookie(dispatch);
    };
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
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
      <Toaster />
    </BrowserRouter>
  )
}

export default App
