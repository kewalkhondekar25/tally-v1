import { Input } from '@/components/ui/input';
import { ArrowRight, File, GripVertical, LayoutTemplate, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import BlockPicker from './BlockPicker';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeBlockPicker, deleteBlocks, openBlockPicker } from '@/store/features/blockpicker/blockerPickerSlice';
import Blocks from './Blocks';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@radix-ui/react-tooltip';
import useReduxState from '@/hooks/useReduxState';
import { useNavigate, useParams } from 'react-router-dom';
import { saveForm } from '../service';
import { toast } from 'sonner';

const FormComponent = () => {

    const { isBlockerPickerOpen, blockName } = useAppSelector(state => state.blockpicker);
    const { blockName: blocks } = useReduxState();

    const dispatch = useAppDispatch();
    const params = useParams();
    const { formId } = params;

    const toolRef = useRef<HTMLInputElement | null>(null);
    const indexRef = useRef<number>(0);

    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isToolOpen, setIsToolOpen] = useState(false);
    const [formName, setFormName] = useState("");
    const navigate = useNavigate();


    const handleKeypress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            setIsEditorOpen(true);
            setIsToolOpen(true);
            setTimeout(() => {
                const input = document.getElementById("tool") as HTMLInputElement;
                input?.focus();
            }, 0);

        };
        if (e.key === "/") {
            dispatch(openBlockPicker());
        } else {
            dispatch(closeBlockPicker());
        }
    };

    const handleBlockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        if (e.target.value === "/") {
            dispatch(openBlockPicker());
        } else {
            dispatch(closeBlockPicker());
        }
    };

    const handleSaveForm = async () => {

        //check if all fields have questions?
        const noQuestion = blocks.filter(item => !item.question);
        if (noQuestion.length >= 1) {
            toast.error("Questions are Required!");
            return;
        };

        //check if checkboxes & dropdowns have options?
        const noCheckboxesOpt = blocks
            .filter(item => item.name === "checkboxes")
            .filter(item => !item.options);

        if(noCheckboxesOpt.length >= 1){
            return toast.error("Checkboxes Options are Required!");
        }

        const noDropdownOpt = blocks
            .filter(item => item.name === "dropdown")
            .filter(item => !item.options);

        if(noDropdownOpt.length >= 1){
            return toast.error("Dropdown Options are Required!");
        }

        if (!formId) {
            console.error("Form Id not provided");
            toast.error("Form Id not provided");
            return;
        };
        const payload = {
            formId,
            formName,
            formData: blocks.map(item => ({
                blockId: item.id,
                blockName: item.name,
                blockIndex: item.index ?? 0,
                blockQuestion: item.question!,
                blockPlaceholder: item.placeholder ?? undefined,
                blockOptions: item.options ?? undefined
            }))
        };

        try {
            const savedForm = await saveForm(payload);
            if (savedForm.statusCode === 201) {
                toast.success(savedForm.message);
                dispatch(deleteBlocks());
                navigate(`/form/${formId}/submissions`);
            };
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isToolOpen && toolRef.current) {
            toolRef.current.focus();
            toolRef.current.value = ""
        }
    }, [isToolOpen, blockName]);

    return (
        <div className='relative h-screen min-w-screen overflow-y-auto flex flex-col items-center'
            onKeyDown={handleKeypress} tabIndex={0}>
            {
                blocks.length >= 1 && formName && blocks[0].question?.length! >= 1 && (
                    <Button
                        onClick={() => handleSaveForm()}
                        className='absolute top-1 right-1 z-50
                        bg-[#0070d7] h-6'>Publish</Button>
                )
            }

            <Input
                className="border-none text-3xl font-bold text-gray-700 mt-20 mb-5 
                ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none 
                shadow-none
                placeholder:text-3xl placeholder:font-bold"
                placeholder='Form title'
                autoFocus
                onChange={(e) => setFormName(e.target.value)}
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
            <Blocks />

            {
                isToolOpen && (
                    <div
                        className='relative flex justify-center items-center text-gray-400 
                        mt-5 mb-10'>
                        <Trash2 className='h-4' />
                        <Plus className='h-4' />
                        <GripVertical className='h-4' />
                        <input
                            id='tool'
                            type="text"
                            placeholder={`Type '/ ' to insert blocks`}
                            ref={toolRef}
                            onChange={handleBlockChange}
                            className="border-none text-gray-700 w-52
                            ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none ml-1 
                            shadow-none" />
                        {isBlockerPickerOpen && <BlockPicker indexRef={indexRef} />}
                    </div>
                )
            }
            {
                (isToolOpen && !isBlockerPickerOpen) && (
                    <div className='w-64'>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button className='mb-3'>Submit
                                        <ArrowRight />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className='bg-[#171717] text-white p-1 text-sm mb-1 rounded'>Forms cannot be submitted from the form builder. Use a published form to submit a response.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                )
            }
        </div>
    );
}

export default FormComponent;