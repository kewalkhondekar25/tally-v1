import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from '@/store/hooks';
import  { LogOut } from "lucide-react";
import { logoutService } from '@/features/authentication/services/auth';

const Console = () => {

  const { email } = useAppSelector(state => state.auth);

  const handleLogout = async () => {
    try {
      const response = await logoutService();
      if(response.status === 200){
        window.location.href = "/login"
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className='absolute bottom-0 h-12 min-w-11/12 mx-1 my-3 border-1 border-gray-400 rounded-full flex justify-between items-center p-3
    sm:right-0 md:left-0'>
      <div className='flex justify-center items-center gap-1'>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='text-xs font-semibold'>
          <p>Good Evening</p>
          <p>{email}</p>
        </div>
      </div>
      <div>
        <LogOut className='cursor-pointer' onClick={() => handleLogout()}/>
      </div>
    </div>
  )
}

export default Console