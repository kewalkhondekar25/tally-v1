import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import { Signup, Login} from "./pages/Signup";
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from './hooks/AuthProvider';

function App() {

  return (
    <BrowserRouter>
    <AuthProvider/>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='signup' element={<Signup/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='*' element={<h3>Route Not Found</h3>}/>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
