import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import WorkspaceFolder from './WorkspaceFolder'
import { create, getAllWorkspaces } from '../service'
import { toast } from 'sonner'
import { useAppDispatch } from '@/store/hooks'
import { setWorkspaces } from '@/store/features/workspace/workspaceSlice'

const WorkspaceComponent = () => {

  const dispatch = useAppDispatch();

  const handleCreateWorkspace = async () => {
    try {
      await create();
      const allWorkspaces = await getAllWorkspaces();
      dispatch(setWorkspaces(allWorkspaces?.data));
      toast.success("Workspace created");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message)
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center group cursor-pointer mt-2 mb-2'>
        <p className='text-sm font-semibold'>Workspaces</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <Plus onClick={() => handleCreateWorkspace()} className='h-4 opacity-100 sm:opacity-0 group-hover:opacity-100' />
          </TooltipTrigger>
          <TooltipContent>
            <p>New Workspace</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <WorkspaceFolder/>
    </div>
  )
}

export default WorkspaceComponent