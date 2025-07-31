import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppSelector } from '@/store/hooks'
import navLinks from '@/utils/data'
import { Link } from 'react-router-dom'
import { Timer } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

const Navbar = () => {
    const { email } = useAppSelector(state => state.auth)
    return (
        <div className='min-w-60 flex flex-col mx-0.5 my-5'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center'>
                    <Timer/>
                    <p className='text-xs'>Free Plan</p>
                </div>
                <Progress className='h-1' value={33} />
            </div>
            {/* <div className='flex place-items-center gap-2 mt-5'>
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <p>{email}</p>
            </div> */}
            <nav className='mt-3'>
                {
                    navLinks.map(item => {
                        return(
                            <Link key={item.name} to={`/${item.name}`}>
                                <div className='flex items-center gap-3 mt-2'>
                                    <item.icon 
                                        className={item.name === "upgrade" ? 
                                        "text-pink-500": ""}/>
                                    <p className='capitalize text-black text-sm font-semibold'>{item.name}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </nav>

        </div>
    )
}

export default Navbar