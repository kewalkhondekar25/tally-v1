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
import { getAllWorkspaces } from './features/workspaces/service';
import { setWorkspaces } from './store/features/workspace/workspaceSlice';
import Form from './pages/Form';
import SubmissionForm from './pages/FormSubmission';
import { FormDetail } from './pages/FormDetails';
import FormSummary from './features/forms/components/FormSummary';
import FormSubmission from './features/forms/components/FormSubmission';
import FormShare from './features/forms/components/FormShare';
import FormIntegration from './features/forms/components/FormIntegration';

function App() {
  
  const dispatch = useAppDispatch();
  const { isSidebarOpen } =  useAppSelector(state => state.sidebar);
  
  useEffect(() => {
    const fetchUser = async () => {
      await setCookie(dispatch);
      const allworkspaces = await getAllWorkspaces();
      dispatch(setWorkspaces(allworkspaces.data));
    };
    fetchUser();
  }, [isSidebarOpen]);

  return (
    <BrowserRouter>
      <div className='relative'>
        <div className={`fixed transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 
        "translate-x-0" : " -translate-x-full"} z-20`}>
          {/* { isSidebarOpen && <Sidebar/>} */}
          <Sidebar/>
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
            <Route element={<ProtectRoute/>}>
              <Route path='/form/:workspaceId/:formId/edit' element={<Form/>}/>
            </Route>
            <Route element={<ProtectRoute/>}>
              <Route path='/form/:formId' element={<FormDetail/>}>
                <Route path='summary' element={<FormSummary/>}/>
                <Route path='submissions' element={<FormSubmission/>}/>
                <Route path='share' element={<FormShare/>}/>
                <Route path='integrations' element={<FormIntegration/>}/>
              </Route>
            </Route>
            <Route element={<ProtectRoute/>}>
              <Route path='/form/publish/:formId' element={<SubmissionForm/>}/>
            </Route>
            <Route path='/form/:slug' element={<SubmissionForm/>}/>
            <Route path='*' element={<h3>Route Not Found</h3>}/>
        </Routes>
        </div>
      </div>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
