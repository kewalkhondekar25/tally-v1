import React, { useState } from 'react'
import BlockTool from '../BlockTool'
import Question from './Question'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input'
import useReduxState from '@/hooks/useReduxState'
import useGlobalState from '@/hooks/useGlobalState'
import { useAppDispatch } from '@/store/hooks'
import { setPlaceholder, setOptions } from '@/store/features/blockpicker/blockerPickerSlice'

const CheckBox = ({ i }: { i: number }) => {

    const { blockName } = useReduxState();
    const currentBlock = blockName[i]
    const currentBlockIndex = blockName[i].index;

    const dispatch = useAppDispatch();
    

    const [addCheckbox, setAddCheckbox] = useState(1);
    const [option, setOption] = useState<string>("");
    const [disabledInputs, setDisabledInputs] = useState<{ [key: number]: boolean }>({});

    const handleBlur = (i: number) => {
        dispatch(setOptions({ options: option , index: currentBlockIndex! }));
        setDisabledInputs(prev => ({
            ...prev,
            [i]: true
        }));
    };


    return (
        <div key={i} className='flex justify-center items-center mt-3'>
            <BlockTool i={i} />
            <div>
                <Question index={currentBlockIndex!} />
                <div className='flex flex-col items-center'>
                    {
                        Array.from({ length: addCheckbox }).map((_, i) => {
                            return (
                                <div className='flex items-center gap-3 -my-1' key={i}>
                                    <Checkbox disabled className='border-gray-400' />
                                    <Input
                                        disabled={disabledInputs[i]}
                                        onBlur={() => handleBlur(i)}
                                        onChange={(e) => setOption(e.target.value)}
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