import React, { lazy, Suspense } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import navLinks from '@/utils/data'
import { Link } from 'react-router-dom'
import { Loader2Icon, Timer } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { closeSidebar } from '@/store/features/sidebar/sidebarSlice';

const Workspace = lazy(() => import("@/pages/Workspace"));

const Navbar = () => {

    const dispatch = useAppDispatch();

    return (
        <div className='min-w-60 flex flex-col my-5 gap-3'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center'>
                    <Timer />
                    <p className='text-xs'>Free Plan</p>
                </div>
                <Progress className='h-1' value={33} />
            </div>
            <nav>
                {
                    navLinks.map(item => {
                        return (
                            <Link onClick={() => dispatch(closeSidebar())} key={item.name} to={`/${item.name}`}>
                                <div className='flex items-center gap-3 mt-2'>
                                    <item.icon
                                        className={item.name === "upgrade" ?
                                            "text-pink-500" : ""} />
                                    <p className='capitalize text-black hover:text-gray-400 text-sm font-semibold'>{item.name}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </nav>
            <Suspense fallback={<div className="flex justify-center items-center h-screen">
                <Loader2Icon className="animate-spin" /></div>}>
                <Workspace />
            </Suspense>
        </div>
    )
}

export default Navbar