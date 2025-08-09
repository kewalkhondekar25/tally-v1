import React from 'react';
import { Textarea } from "@/components/ui/textarea"
import BlockTool from '../BlockTool';
import Question from './Question';

const TextAreaComponent = ({ i }: { i: number}) => {
  return (
    <div key={i} className='flex justify-center items-center mt-3'>
            <BlockTool i={i} />
            <div>
                <Question/>
                <Textarea
                    className='placeholder:text-gray-400 text-gray-400 w-48'
                    placeholder='Type placeholder text'/>
                {/* <Input 
                    className='placeholder:text-gray-400 text-gray-400'
                    placeholder='Type placeholder text'/> */}
            </div>
        </div>
  )
}

export default TextAreaComponent