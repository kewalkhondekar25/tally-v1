import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, CopyCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getFormDetails } from '../service'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { File } from '@/types'

const FormShare = () => {

    const { formId } = useParams();
    const [form, setForm] = useState<File>();
    const [copied, setCopied] = useState(false);

    const domain = import.meta.env.ENV_PROD ? import.meta.env.VITE_PROD_DOMAIN! : import.meta.env.VITE_DEV_DOMAIN  
    const link = `${domain}/form/${form?.slug}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            toast.success("Form link copied to clipboard");
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchForm = async (formId: string) => {
            try {
                const formData = await getFormDetails(formId);
                if(formData.statusCode === 200){
                    setForm(formData.data)
                }
            } catch (error: any) {
                toast.error(error.response.data.message)
            }
        };
        fetchForm(formId!)
    }, []);

    return (
        <section className='flex flex-col items-center mx-3'>
            <div className='my-5'>
                <h1 className='text-xl font-semibold'>Share Link</h1>
                <p className='mt-3 text-sm text-gray-700'>Your form is now published and ready to be shared with the world! 
                    Copy this link to share your form on social media, messaging apps or via email.
                </p>
            </div>
            <div className='flex w-full gap-2'>
                <Input value={link ?? ""} readOnly/>
                <Button onClick={handleCopy}>
                     {copied ? <CopyCheck/> : <Copy/>}
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