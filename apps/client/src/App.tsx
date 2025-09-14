import { useEffect, lazy, Suspense } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from './router/PublicRoute';
import ProtectRoute from './router/ProtectRoute';
const Landing = lazy(() => import("./pages/Landing"));
const Signup = lazy(() => import("./pages/Signup").then(module => ({ default: module.Signup })));
const Login = lazy(() => import("./pages/Signup").then(module => ({ default: module.Login })));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Sidebar = lazy(() => import("./components/sidebar/Sidebar"));
const Form = lazy(() => import("@/features/forms/components/FormComponent"));
const FormDetail = lazy(() => import("@/features/forms/components/FormDetails"));
import FormSummary from './features/forms/components/FormSummary';
const FormSubmission = lazy(() => import("@/features/forms/components/FormSubmission"));
const FormShare = lazy(() => import("@/features/forms/components/FormShare"));
const FormIntegration = lazy(() => import("@/features/forms/components/FormIntegration"));
const SubmissionForm = lazy(() => import("./pages/FormSubmission"))
import { Toaster } from "@/components/ui/sonner";
import setCookie from './utils/cookie';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getAllWorkspaces } from './features/workspaces/service';
import { setWorkspaces } from './store/features/workspace/workspaceSlice';
import Thankyou from './pages/Thankyou';
import { Loader2Icon } from "lucide-react";
import NotFound from "./pages/NotFound";

function App() {

  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector(state => state.sidebar);

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
          <Suspense fallback={<div className="flex justify-center items-center h-screen">
            <Loader2Icon className="animate-spin" /></div>}>
            <Sidebar />
          </Suspense>
        </div>
        <div>
          <Routes>

            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path='/' element={<Landing />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectRoute />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='/form/:workspaceId/:formId/edit' 
                element={<Suspense fallback={<div className="flex justify-center items-center h-screen">
                  <Loader2Icon className="animate-spin" /></div>}><Form /></Suspense>}
              />
              <Route path='/form/:formId' element={<FormDetail />}>
                <Route path='summary' element={<FormSummary />} />
                <Route path='submissions' element={<FormSubmission />} />
                <Route path='share' element={<FormShare />} />
                <Route path='integrations' element={<FormIntegration />} />
              </Route>
              <Route path='/form/publish/:formId' element={<SubmissionForm />} />
            </Route>

            {/* No Guard */}
            <Route path='/form'>
              <Route path='submit/:slug'
                element={<Suspense fallback={<div className="flex justify-center items-center h-screen">
                  <Loader2Icon className="animate-spin" /></div>}>
                  <SubmissionForm />
                </Suspense>
                } />
              <Route path='submit/:slug/thanks'
                element={<Suspense fallback={<div className="flex justify-center items-center h-screen">
                  <Loader2Icon className="animate-spin" /></div>}>
                  <SubmissionForm />
                  <Thankyou />
                </Suspense>} />
            </Route>

            {/* Fallback */}
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </div>
      </div>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
