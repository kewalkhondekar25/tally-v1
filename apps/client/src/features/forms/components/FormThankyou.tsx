import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import React from 'react'

const FormThankyouComponent = () => {
    return (
        <section>
            <div className='flex flex-col justify-center items-center min-h-screen mx-5 
                text-center gap-3'>
                <div className='flex justify-center items-center bg-[#dfedfa] 
                    h-14 w-14 rounded-full'>
                    <Check className='text-[#0070d7] h-10 w-10 p-1'/>
                </div>
                <h1 className='text-2xl font-semibold'>Thanks for completing this form!</h1>
                <p className='text-gray-500'>Made with Tally, the simplest way to create forms for free.</p>
                <Button className='mt-5 bg-[#0070d7]'>Create your own form</Button>
            </div>
        </section>
    )
}

export default FormThankyouComponent