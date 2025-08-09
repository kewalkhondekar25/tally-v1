import { deleteBlockPicked } from '@/store/features/blockpicker/blockerPickerSlice';
import { useAppDispatch } from '@/store/hooks';
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const BlockTool = ({ i }: { i: number}) => {

    const dispatch = useAppDispatch();

    return (
        <div className='flex justify-center items-center text-gray-400'>
            <Trash2 className='h-4' onClick={() => dispatch(deleteBlockPicked({ i }))} />
            <Plus className='h-4' />
            <GripVertical className='h-4' />
        </div>
    );
};

export default BlockTool;