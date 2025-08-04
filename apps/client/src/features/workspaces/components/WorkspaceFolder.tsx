import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useAppSelector } from '@/store/hooks';

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
    console.log("workspaces", workspaces);

    if (workspaces.length < 1) {
        return <p>empty</p>
    }

    return (
        <div className='max-h-40 overflow-auto cursor-pointer'>
            {
                workspaces.map((item, i) => {
                    return (
                        <Accordion key={i} type="single" collapsible className='-my-3'>
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