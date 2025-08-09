import React from 'react'
import { blocks } from '../data/blocks'
import { useAppDispatch } from '@/store/hooks';
import { closeBlockPicker, setBlockPickedName } from '@/store/features/blockpicker/blockerPickerSlice';

const BlockPicker = () => {

    const dispatch = useAppDispatch();

    const handleClick = (item: { id: number, name: string, icon: any }) => {
        console.log("selected", item.name);
        dispatch(setBlockPickedName({ id: item.id, name: item.name }));
        dispatch(closeBlockPicker());
    };

    return (
        <div className='absolute top-8 right-3 
            w-56 h-52 overflow-auto border p-1 rounded-xl shadow-xl'>
            <div className='text-sm text-gray-400 font-semibold cursor-default py-2 px-1'>Questions</div>
            <div className='cursor-pointer'>
                {
                    blocks.map(item => {
                        return (
                            <div key={item.id}
                                onClick={() => handleClick(item)}
                                className='w-full flex items-center gap-2 
                                hover:bg-gray-100 py-1
                                rounded'>
                                <item.icon className='h-4 text-gray-400' />
                                <span className='capitalize text-gray-600 text-sm font-medium'>{item.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default BlockPicker