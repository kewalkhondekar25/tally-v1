import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <section className='flex flex-col justify-center items-center h-screen mx-2 gap-5'>
            <img className='h-60' src="https://tally.so/images/personas/meditation.png" alt="not-found" />
            <h1 className='text-3xl font-bold text-center'>Oops, page was not found!</h1>
            <p className='text-gray-500 text-center'>This page doesn't exist. If you think there is something off, please contact us.</p>
            <Link to="/dashboard">
                <Button className='bg-[#0070d7]'>
                    <Home />
                    Go back home
                </Button>
            </Link>
        </section>
    )
}

export default NotFound