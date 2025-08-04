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
import { Ellipsis, FolderPen, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteWorkspace, getAllWorkspaces } from "../service";
import { toast } from "sonner";
import { setWorkspaces } from "@/store/features/workspace/workspaceSlice";

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

    if (workspaces.length < 1) {
        return <p className="text-xs">Create Workspaces</p>
    }

    return (
        <div className='max-h-44 overflow-auto cursor-pointer'>
            {
                workspaces.map((item, i) => {
                    return (
                        <div key={i} className="flex justify-between items-center group h-10">
                            <Accordion type="single" collapsible className='-my-3'>
                                <AccordionItem value="item-1">
                                    <div className='flex items-center gap-2'>
                                        <AccordionTrigger className='flex-none cursor-pointer'></AccordionTrigger>
                                        <span className='text-sm text-gray-800 font-semibold'>{item.name}</span>
                                    </div>
                                    {/* {
                                    workspace.files.map((item, i) => {
                                        return (
                                            <AccordionContent className='ml-6 pb-2' key={i}>
                                            Form {i + 1}
                                            </AccordionContent>
                                            )
                                            })
                                            } */}
                                </AccordionItem>
                            </Accordion>
                            <div className="flex">
                                <span className="relative">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Ellipsis onClick={() => setIsOpen({ state: true, id: item.id })} className='h-4 opacity-100 sm:opacity-0 group-hover:opacity-100' />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Rename, Delete</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    {
                                        isOpen.state && isOpen.id === item.id && (
                                            <div className="absolute right-0 -top-3 z-10 h-12 w-24 p-0.5 border rounded bg-white">
                                                <span onClick={() => setIsOpen({ state: false, id: item.id })} className="flex items-center text-sm gap-1">
                                                    <FolderPen className="h-5" />
                                                    <p className="text-gray-700">Rename</p>
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
                                            <Plus onClick={() => alert("file added")} className='h-4 opacity-100 sm:opacity-0 group-hover:opacity-100' />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>New Form</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </span>
                            </div>
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