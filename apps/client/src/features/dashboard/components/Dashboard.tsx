import React, { useEffect, useState } from 'react'
import useReduxState from '@/hooks/useReduxState'
import { FilePlus2, FolderPlus } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { openSidebar } from '@/store/features/sidebar/sidebarSlice';

type FileType = {
  id: string;
  name: string;
  workspaceId: string;
  slug: string;
  createdAt: string;
  updateddAt: string;
};
type WorkspaceType = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updateddAt: string;
  files: FileType[];
};
type WorkspacesType = WorkspaceType[];

const DashboardComponent = () => {

  const dispatch = useAppDispatch();
  const { workspaces, isLoading }: { workspaces: WorkspacesType, isLoading: boolean} = useReduxState();

  useEffect(() => {
    setTimeout(() => {
      dispatch(openSidebar());
    }, 1000);
  }, []);

  return (
    <section className='mx-3'>
      <div className='pt-20'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Dashboard</h1>
          <div className='flex gap-2'>
            <FolderPlus className='text-gray-500' />
            <FilePlus2 className='text-gray-500' />
          </div>
        </div>
        <Separator orientation='horizontal' className='mt-3' />
      </div>
      {
        workspaces.length < 1 ?
          <div className='flex flex-col gap-3 justify-center items-center pt-20'>
            <img
              className='sm:w-60'
              src="https://tally.so/images/personas/roll-sleeves.png"
              alt="no-forms-yet" />
            <p className='font-semibold'>No forms yet</p>
            <p className='text-center text-gray-400'>Roll up your sleeves and let’s get started.
              It's as simple as one-two-three
            </p>
            <ol className='list-decimal text-gray-400'>
              <li>Open Sidebar</li>
              <li>Create a Workspace</li>
              <li>Create a Form</li>
            </ol>
          </div> :
          <div className='pt-10'>
            {
              workspaces.map(item => (item.files.map(form => {
                return (
                  <Link to={`/form/${form.id}/submissions`} key={form.id}>
                    <div className='py-2'>
                      <p className='text-base font-semibold'>{form.name}</p>
                      <p className='text-sm text-gray-500'>1 submission</p>
                    </div>
                  </Link>
                )
              })))
            }
          </div>
      }
    </section>
  )
}

export default DashboardComponent