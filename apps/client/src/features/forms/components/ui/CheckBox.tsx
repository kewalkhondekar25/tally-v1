import React, { useState } from 'react'
import BlockTool from '../BlockTool'
import Question from './Question'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input'

const CheckBox = ({ i }: { i: number }) => {

    const [addCheckbox, setAddCheckbox] = useState(1);
    console.log(addCheckbox);
    

    return (
        <div key={i} className='flex justify-center items-center mt-3'>
            <BlockTool i={i} />
            <div>
                <Question />
                <div className='flex flex-col items-center'>
                    {
                        Array.from({ length:addCheckbox}).map((_, i) => {
                            return (
                                <div className='flex items-center gap-3 -my-1' key={i}>
                                    <Checkbox disabled className='border-gray-400' />
                                    <Input
                                        placeholder={`Option ${i + 1}`}
                                        className='p-0 border-none ring-0 
                                        focus-visible:ring-0 focus:ring-0 focus:outline-none shadow-none
                                        placeholder:text-gray-400'
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div
                    onClick={() => setAddCheckbox(prev => prev + 1)}
                    className='flex items-center gap-3 mt-1 text-gray-300'>
                    <Checkbox disabled />
                    <div>Add more option</div>
                </div>
            </div>
        </div>
    )
}

export default CheckBox