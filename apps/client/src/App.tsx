import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import { Signup, Login} from "./pages/Signup";
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from './hooks/AuthProvider';
import PublicRoute from './router/PublicRoute';

function App() {

  return (
    <BrowserRouter>
    <AuthProvider/>
      <Routes>
        <Route path='/' element={ <PublicRoute><Landing/></PublicRoute>} />
        <Route path='signup' element={<PublicRoute><Signup/></PublicRoute>}/>
        <Route path='login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='*' element={<h3>Route Not Found</h3>}/>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
