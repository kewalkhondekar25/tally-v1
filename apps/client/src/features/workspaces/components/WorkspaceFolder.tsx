import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Ellipsis, FolderPen, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { deleteWorkspace, getAllWorkspaces } from "../service";
import { toast } from "sonner";
import { setWorkspaces } from "@/store/features/workspace/workspaceSlice";
import { createForm } from "@/features/forms/service";
import { useNavigate } from "react-router-dom";
import { closeSidebar } from "@/store/features/sidebar/sidebarSlice";

export interface Workspace {
    id: string;
    name: string;
    userId: string;
    createdAt: string,
    updatedAt: string;
    files: any[];
}

const WorkspaceFolder = () => {

    const { workspaces } = useAppSelector(state => state.workspace as { workspaces: Workspace[] });
    const [isOpen, setIsOpen] = useState({
        state: false,
        id: ""
    });
    console.log("workspaces", workspaces);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleDeleteWorkspace = async (workspaceId: string) => {
        try {
            const deletedWorkspace = await deleteWorkspace(workspaceId);
            if (deletedWorkspace.statusCode === 200) {
                const allWorkspaces = await getAllWorkspaces();
                dispatch(setWorkspaces(allWorkspaces?.data));
                toast.success("Workspace Deleted");
            };
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    };

    const handleAddForm = async (workspaceId: string) => {
        try {
            const newForm = await createForm(workspaceId);
            const newFormId = newForm.data.id;
            if (newForm.statusCode === 201) {
                const allWorkspaces = await getAllWorkspaces();
                dispatch(setWorkspaces(allWorkspaces.data));
                toast.success("Form created");
                dispatch(closeSidebar())
                navigate(`/form/${workspaceId}/${newFormId}`);
            };
        } catch (error: any) {
            console.log();
            toast.error(error?.response?.data?.message);
        }
    };

    if (workspaces.length < 1) {
        return <p className="text-xs">Create Workspaces</p>
    }

    return (
        <div className='max-h-40 overflow-auto cursor-pointer pt-3 pb-3'>
            {
                workspaces?.map((item, i) => {
                    return (
                        <div key={i} className="flex justify-between items-center group -my-2">
                            <Accordion type="single" collapsible className='w-full'>
                                <AccordionItem value="item-1">
                                    <div className='flex justify-between items-center'>
                                        <div className="flex items-center gap-2">
                                            <AccordionTrigger 
                                                className='flex-none cursor-pointer'></AccordionTrigger>
                                            <span 
                                                className='text-sm text-gray-800 font-semibold'>{item.name}</span>
                                        </div>
                                        <div className="flex">
                                            <span className="relative">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Ellipsis 
                                                            className='h-4 opacity-100 sm:opacity-0 group-hover:opacity-100'
                                                            onClick={() => setIsOpen({ 
                                                            state: true, id: item.id 
                                                        })}/>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Rename, Delete</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                                {
                                                    isOpen.state && isOpen.id === item.id && (
                                                        <div 
                                                            className="absolute flex flex-col justify-center gap-1 
                                                            right-3 -top-5 z-30 h-14 w-32  border rounded bg-white shadow-md">
                                                            <span onClick={() => setIsOpen({ state: false, id: item.id })} className="relative flex items-center text-sm gap-1">
                                                                <FolderPen className="h-5" />
                                                                <p className="text-gray-700">Rename</p>
                                                                <X onClick={() => setIsOpen({ state: false, id: item.id })} className="absolute right-0 top-0 h-4" />
                                                            </span>
                                                            <span onClick={() => { setIsOpen({ state: false, id: item.id }), handleDeleteWorkspace(item.id) }} className="flex items-center text-sm gap-1">
                                                                <Trash2 className="h-5" />
                                                                <p className="text-gray-700">Delete</p>
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                            </span>
                                            <span>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Plus onClick={() => handleAddForm(item.id)} className='h-4 opacity-100 sm:opacity-0 group-hover:opacity-100' />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>New Form</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </span>
                                        </div>
                                    </div>
                                    {
                                        item.files.map((item, i) => {
                                            return (
                                                <AccordionContent className='ml-6 pb-2' key={i}>
                                                    {item.name}
                                                </AccordionContent>

                                            )
                                        })
                                    }
                                    {/* {
                                        item.id === isOpen.id && (
                                            <div className="bg-pink-200 -mt-3 overflow-hidden h-8">
                                               
                                            </div>
                                        )
                                    } */}

                                </AccordionItem>
                            </Accordion>
                        </div>
                    )
                })
            }

            {/* {
                arr1.map((item, i) => {
                    return (
                        <Accordion key={i} type="single" collapsible className='-my-3'>
                            <AccordionItem value="item-1">
                                <div className='flex items-center gap-2'>
                                    <AccordionTrigger className='flex-none cursor-pointer'></AccordionTrigger>
                                    <span className='text-sm text-gray-800 font-semibold'>My Workspace</span>
                                </div>
                                {
                                    arr.map((item, i) => {
                                        return (
                                            <AccordionContent className='ml-6 pb-2' key={i}>
                                                Form {i + 1}
                                            </AccordionContent>
                                        )
                                    })
                                }
                            </AccordionItem>
                        </Accordion>
                    )
                })
            } */}
        </div>
    )
}

export default WorkspaceFolder