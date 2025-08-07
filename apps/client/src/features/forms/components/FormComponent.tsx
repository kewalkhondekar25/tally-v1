import { Input } from '@/components/ui/input';
import { File, GripVertical, LayoutTemplate, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const FormComponent = () => {

    const params = useParams();
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isToolOpen, setIsToolOpen] = useState(false);
    const toolRef = useRef<HTMLInputElement | null>(null);


    const handleKeypress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            setIsEditorOpen(true);
            setIsToolOpen(true);
            setTimeout(() => {
                const input = document.getElementById("tool") as HTMLInputElement;
                input?.focus();
            }, 0);

        };
        // if(e.key === "/"){
        //     setIsToolOpen(true);
        //     setTimeout(() => {
        //         
        //     }, 0);
        // }
    };

    useEffect(() => {
        if (isToolOpen && toolRef.current) {
            toolRef.current.focus();
        }
    }, [isToolOpen]);

    return (
        <div className='min-h-screen min-w-screen flex flex-col items-center'
            onKeyDown={handleKeypress} tabIndex={0}>
            <Input
                className="border-none text-2xl font-bold text-gray-700 mt-20 mb-5 
                ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none 
                shadow-none
                placeholder:text-2xl placeholder:font-bold"
                placeholder='Form title'
                autoFocus
            />
            {
                !isEditorOpen && (
                    <>
                        <div className='flex flex-col text-gray-400 font-semibold gap-2'>
                            <div className='flex gap-2'>
                                <File />
                                <p>Press Enter to start from scratch</p>
                            </div>
                            <div className='flex gap-2'>
                                <LayoutTemplate />
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
                    </>
                )
            }
            {
                isToolOpen && (
                    <div className='flex justify-center items-center text-gray-400'>
                        <Trash2 className='h-4' />
                        <Plus className='h-4' />
                        <GripVertical className='h-4' />
                        <input
                            id='tool'
                            type="text"
                            placeholder={`Type '/ ' to insert blocks`}
                            // readOnly
                            // onKeyUp={(e) => e.preventDefault()}
                            ref={toolRef}
                            className="border-none text-gray-700 w-full
                            ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none ml-1 
                            shadow-none" />
                    </div>
                )
            }
        </div>
    );
}

export default FormComponent;