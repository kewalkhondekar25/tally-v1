import React from 'react'
import BlockTool from '../BlockTool'
import Question from './Question'
import { Input } from '@/components/ui/input'
import { AtSign } from 'lucide-react'
import useReduxState from '@/hooks/useReduxState'
import useGlobalState from '@/hooks/useGlobalState'
import { useAppDispatch } from '@/store/hooks'
import { setPlaceholder } from '@/store/features/blockpicker/blockerPickerSlice'

const Email = ({ i }: { i: number }) => {
    const { blockName } = useReduxState();
    const currentBlock = blockName[i]
    const currentBlockIndex = blockName[i].index;

    const { blockValues, setBlockValues } = useGlobalState();
    const dispatch = useAppDispatch();
    const handleBlur = () => {
        dispatch(setPlaceholder({ placeholder: blockValues.placeholder, index: currentBlockIndex! }));
    };
    return (
        <div key={i} 
            className='flex justify-center items-center mt-3
            sm:justify-start sm:w-80'>
            <BlockTool i={i} />
            <div>
                <Question index={currentBlockIndex!}/>
                <div className='relative'>
                    <Input
                        onChange={(e) => setBlockValues(prev => ({ ...prev, placeholder: e.target.value }))}
                        onBlur={handleBlur}
                        className='placeholder:text-gray-400 text-gray-400 px-1
                        sm:w-80'
                        placeholder='Type placeholder text'
                        type='text'
                    />
                    <AtSign className='absolute right-1 top-3 h-4 text-gray-600' />
                </div>
            </div>
        </div>
    )
}

export default Email