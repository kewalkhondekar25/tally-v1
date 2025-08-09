import { Input } from '@/components/ui/input';
import { File, GripVertical, LayoutTemplate, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import BlockPicker from './BlockPicker';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeBlockPicker, openBlockPicker } from '@/store/features/blockpicker/blockerPickerSlice';
import Blocks from './Blocks';

const FormComponent = () => {

    const { isBlockerPickerOpen, blockName } = useAppSelector(state => state.blockpicker);
    const dispatch = useAppDispatch();
    

    const toolRef = useRef<HTMLInputElement | null>(null);
    const  indexRef = useRef<number>(0);
    
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isToolOpen, setIsToolOpen] = useState(false);


    const handleKeypress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            setIsEditorOpen(true);
            setIsToolOpen(true);
            setTimeout(() => {
                const input = document.getElementById("tool") as HTMLInputElement;
                input?.focus();
            }, 0);

        };
        if(e.key === "/"){
            dispatch(openBlockPicker());
        }else{
            dispatch(closeBlockPicker());
        }
    };

    const handleBlockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        if(e.target.value === "/"){
            dispatch(openBlockPicker());
        }else{
            dispatch(closeBlockPicker());
        }
    };

    useEffect(() => {
        if (isToolOpen && toolRef.current) {
            toolRef.current.focus();
            toolRef.current.value = ""  
        }
    }, [isToolOpen, blockName]);

    return (
        <div className='h-screen min-w-screen overflow-y-auto flex flex-col items-center'
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

            {/* BLOCKS */}
            <Blocks/>
            
            {
                isToolOpen && (
                    <div className='relative flex justify-center items-center text-gray-400 mt-5 mb-10'>
                        <Trash2 className='h-4' />
                        <Plus className='h-4' />
                        <GripVertical className='h-4' />
                        <input
                            id='tool'
                            type="text"
                            placeholder={`Type '/ ' to insert blocks`}
                            ref={toolRef}
                            onChange={handleBlockChange}
                            className="border-none text-gray-700 w-full
                            ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none ml-1 
                            shadow-none" />
                        {isBlockerPickerOpen && <BlockPicker indexRef={indexRef}/>}
                    </div>
                )
            }
        </div>
    );
}

export default FormComponent;