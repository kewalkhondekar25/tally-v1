import React, { lazy, Suspense, useEffect } from 'react';
import { Loader2Icon, PanelLeftClose } from 'lucide-react';
import { closeSidebar } from "@/store/features/sidebar/sidebarSlice";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAllWorkspaces } from '@/features/workspaces/service';
import { setWorkspaces } from '@/store/features/workspace/workspaceSlice';
const Navbar = lazy(() => import("@/components/navbar/Navbar"));
const Console = lazy(() => import("./Console"));

const Sidebar = () => {

  const dispatch = useAppDispatch();
  const { workspaces } = useAppSelector(state => state.workspace);

  useEffect(() => {

    const fetchWorkspace = async () => {
      const allWorkspaces = await getAllWorkspaces();
      dispatch(setWorkspaces(allWorkspaces?.data));
    };

    if (workspaces.length < 1) {
      fetchWorkspace();
    };

  }, []);

  return (
    <div
      className='min-h-screen min-w-screen bg-white px-3 py-3 text-gray-400
        relative'>
      <PanelLeftClose onClick={() => dispatch(closeSidebar())} />
      <Suspense fallback={<div className="flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin" /></div>}>
        <Navbar />
      </Suspense>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin" /></div>}>
        <Console />
      </Suspense>
    </div>
  )
}

export default Sidebar