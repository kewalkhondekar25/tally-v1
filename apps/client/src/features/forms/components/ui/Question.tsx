import React from 'react'
import { Input } from '@/components/ui/input';
import useGlobalState from '@/hooks/useGlobalState';
import { useAppDispatch } from '@/store/hooks';
import { setQuestion } from '@/store/features/blockpicker/blockerPickerSlice';

const Question = ({ index }: { index: number }) => {
        
    const { blockValues, setBlockValues } = useGlobalState();
    console.log("b v", blockValues);
    
    const dispatch = useAppDispatch();
    const handleBlur = () => {
        dispatch(setQuestion({ question: blockValues.question, index}));
    };

    return (
        <Input
            onBlur={handleBlur}
            onChange={(e) => setBlockValues(prev => ({ ...prev, question: e.target.value}))}
            placeholder='Type a Question'
            className="border-none text-gray-700 w-full
            ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none ml-1 
            shadow-none px-0 text-base font-semibold
            placeholder:text-base placeholder:font-semibold placeholder:text-gray-400"
        />
    );
};

export default Question;