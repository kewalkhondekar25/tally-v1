import React from 'react';
import { Textarea } from "@/components/ui/textarea"
import BlockTool from '../BlockTool';
import Question from './Question';
import useReduxState from '@/hooks/useReduxState';
import useGlobalState from '@/hooks/useGlobalState';
import { useAppDispatch } from '@/store/hooks';
import { setPlaceholder } from '@/store/features/blockpicker/blockerPickerSlice';

const TextAreaComponent = ({ i }: { i: number }) => {

  const { blockName } = useReduxState();
  const currentBlock = blockName[i]
  const currentBlockIndex = blockName[i].index;

  const { blockValues, setBlockValues } = useGlobalState();
  const dispatch = useAppDispatch();
  const handleBlur = () => {
    dispatch(setPlaceholder({ placeholder: blockValues.placeholder, index: currentBlockIndex! }));
  };
  return (
    <div key={i} className='flex justify-center items-center mt-3'>
      <BlockTool i={i} />
      <div>
        <Question index={currentBlockIndex!} />
        <Textarea
          onChange={(e) => setBlockValues(prev => ({ ...prev, placeholder: e.target.value }))}
          onBlur={handleBlur}
          className='placeholder:text-gray-400 text-gray-400 w-64'
          placeholder='Type placeholder text' />
      </div>
    </div>
  )
}

export default TextAreaComponent