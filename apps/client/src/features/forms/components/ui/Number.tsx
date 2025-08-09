import React from 'react'
import BlockTool from '../BlockTool'
import Question from './Question'
import { Input } from '@/components/ui/input'
import { Hash } from 'lucide-react';

const Number = ({ i }: { i: number }) => {
    return (
        <div key={i} className='flex justify-center items-center mt-3'>
            <BlockTool i={i} />
            <div>
                <Question />
                <div className='relative'>
                    <Input
                        className='placeholder:text-gray-400 text-gray-400 px-1'
                        placeholder='Type placeholder text'
                        type='text'
                    />
                    <Hash className='absolute right-1 top-3 h-4 text-gray-600'/>
                </div>
            </div>
        </div>
    );
};

export default Number;