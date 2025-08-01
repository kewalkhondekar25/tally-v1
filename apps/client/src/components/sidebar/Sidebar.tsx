import React from 'react';
import { PanelLeftClose } from 'lucide-react';
import { closeSidebar } from "@/store/features/sidebar/sidebarSlice";
import { useAppDispatch } from '@/store/hooks';
import Navbar from '@/components/navbar/Navbar';
import Console from './Console';

const Sidebar = () => {

    const dispatch = useAppDispatch();

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