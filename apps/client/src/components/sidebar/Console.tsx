import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from '@/store/hooks';
import  { LogOut } from "lucide-react";

const Console = () => {

  const { email } = useAppSelector(state => state.auth);
  
  return (
    <div className='absolute bottom-0 h-12 min-w-11/12 mx-1 my-3 border-1 border-gray-400 rounded-full flex justify-between items-center p-3
    sm:right-0'>
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
        <LogOut/>
      </div>
    </div>
  )
}

export default Console