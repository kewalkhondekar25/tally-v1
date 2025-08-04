import React, { useEffect } from 'react';
import { PanelLeftClose } from 'lucide-react';
import { closeSidebar } from "@/store/features/sidebar/sidebarSlice";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Navbar from '@/components/navbar/Navbar';
import Console from './Console';
import { getAllWorkspaces } from '@/features/workspaces/service';
import { setWorkspaces } from '@/store/features/workspace/workspaceSlice';

const Sidebar = () => {

    const dispatch = useAppDispatch();
    const { workspaces } = useAppSelector(state => state.workspace);

    useEffect(() => {

      const fetchWorkspace = async () => {
        const allWorkspaces = await getAllWorkspaces();
        dispatch(setWorkspaces(allWorkspaces?.data));
      };

      if(workspaces.length < 1){
        fetchWorkspace();
      };

    }, []);

  return (
    <div 
        className='min-h-screen min-w-screen bg-white px-3 py-3 text-gray-400
        relative'>
        <PanelLeftClose onClick={() => dispatch(closeSidebar())}/>
        <Navbar/> 
        <Console/>   
    </div>
  )
}

export default Sidebar