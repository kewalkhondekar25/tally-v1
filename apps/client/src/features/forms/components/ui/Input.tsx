import React, { useState } from 'react'
import BlockTool from '../BlockTool'
import { Input } from '@/components/ui/input'
import Question from './Question'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setPlaceholder } from '@/store/features/blockpicker/blockerPickerSlice'
import useReduxState from '@/hooks/useReduxState'
import useGlobalState from '@/hooks/useGlobalState'

const InputComponent = ({ i }: { i: number }) => {

    const { blockName } = useReduxState();
    const currentBlock = blockName[i]
    const currentBlockIndex = blockName[i].index;

    const { blockValues, setBlockValues } = useGlobalState();
    const dispatch = useAppDispatch();
    const handleBlur = () => {
        dispatch(setPlaceholder({ placeholder: blockValues.placeholder, index: currentBlockIndex! }));
    };

    return (
        <div key={i} className='flex justify-center items-center mt-3 gap-2'>
            <BlockTool i={i} />
            <div>
                <Question index={currentBlockIndex!} />
                <Input
                    onChange={(e) => setBlockValues(prev => ({ ...prev, placeholder: e.target.value }))}
                    onBlur={handleBlur}
                    className='placeholder:text-gray-400 text-gray-400
                    sm:w-80 sm:placeholder:text-lg md:w-80'
                    placeholder='Type placeholder text'
                />
            </div>
        </div>
    )
}

export default InputComponent