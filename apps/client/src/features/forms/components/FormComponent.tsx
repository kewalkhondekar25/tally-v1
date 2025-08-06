import { Input } from '@/components/ui/input';
import { File, LayoutTemplate } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';

const FormComponent = () => {
    const params = useParams();
    console.log(params);

    return (
        <div className='min-h-screen min-w-screen flex flex-col justify-center items-center'>
            <Input
                className="border-none text-2xl font-bold text-gray-700 mb-5 
                ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none 
                shadow-none
                placeholder:text-2xl placeholder:font-bold"
                placeholder='Form title'
                autoFocus
            />
            <div className='flex flex-col text-gray-400 font-semibold gap-2'>
                <div className='flex gap-2'>
                    <File />
                    <p>Press here to start from scratch</p>
                </div>
                <div className='flex gap-2'>
                    <LayoutTemplate/>
                    <p>Use a template</p>
                </div>
            </div>
            <div className='flex flex-col text-sm mt-3'>
                <p>Tally is a form builder that 
                    <span className='bg-[#fee3fc] text-[#f81ce5] font-bold'> works like a doc</span>.
                </p>
                <p>Just type
                    <span className='bg-[#fee3fc] text-[#f81ce5] font-bold'> / </span> to insert form blocks
                </p>
            </div>
        </div>
    );
}

export default FormComponent;