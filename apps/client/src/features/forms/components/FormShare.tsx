import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy } from 'lucide-react'
import React from 'react'

const FormShare = () => {
    return (
        <section className='flex flex-col items-center mx-3'>
            <div className='my-5'>
                <h1 className='text-xl font-semibold'>Share Link</h1>
                <p className='mt-3 text-sm text-gray-700'>Your form is now published and ready to be shared with the world! 
                    Copy this link to share your form on social media, messaging apps or via email.
                </p>
            </div>
            <div className='flex w-full gap-2'>
                <Input/>
                <Button>
                    <Copy/> Copy
                </Button>
            </div>
            <div className='my-5'>
                <h1 className='text-xl font-semibold'>Link Preview</h1>
                <p className='mt-3 text-sm text-gray-700'>When you share a link, 
                    it will embed with a preview similar to the one below on social media, 
                    messaging apps, and search engines.
                    <span 
                        className='text-[#db15c8] bg-[#fee8fc] font-semibold 
                        rounded-full px-2 py-0.5'>Pro</span>
                </p>
            </div>
        </section>
    )
}

export default FormShare