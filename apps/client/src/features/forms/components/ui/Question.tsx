import React from 'react'
import { Input } from '@/components/ui/input'

const Question = () => {
    return (
        <Input
            placeholder='Type a Question'
            className="border-none text-gray-700 w-full
            ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none ml-1 
            shadow-none px-0 text-base font-semibold
            placeholder:text-base placeholder:font-semibold placeholder:text-gray-400"
        />
    );
};

export default Question;