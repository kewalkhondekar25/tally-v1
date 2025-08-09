import React, { useState } from 'react';
import {
    Select,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import BlockTool from '../BlockTool';
import Question from './Question';
import { ChevronDown } from 'lucide-react';
import useReduxState from '@/hooks/useReduxState';
import { useAppDispatch } from '@/store/hooks';
import { setOptions } from '@/store/features/blockpicker/blockerPickerSlice';

const DropDown = ({ i }: { i: number }) => {

    const { blockName } = useReduxState();
    const currentBlock = blockName[i]
    const currentBlockIndex = blockName[i].index;

    const dispatch = useAppDispatch();

    const [addOptions, setAddOptions] = useState(1);
    const [option, setOption] = useState<string>("");
    const [disabledInputs, setDisabledInputs] = useState<{ [key: number]: boolean }>({});

    const handleBlur = (i: number) => {
        console.log("i:", i);
        dispatch(setOptions({ options: option, index: currentBlockIndex! }));
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
                        Array.from({ length: addOptions }).map((_, i) => {
                            return (
                                <div className='relative flex flex-col items-center gap-3 mt-1' key={i}>
                                    <Input
                                        disabled={disabledInputs[i]}
                                        onBlur={() => handleBlur(i)}
                                        onChange={(e) => setOption(e.target.value)}
                                        placeholder={`Option ${i + 1}`}
                                        className='p-2 ring-0 text-sm font-semibold text-gray-600 
                                        focus-visible:ring-0 focus:ring-0 focus:outline-none shadow-none
                                        placeholder:text-gray-400'
                                    />
                                    <ChevronDown className='absolute top-2 right-1 text-gray-300' />
                                </div>
                            )
                        })
                    }
                </div>
                <div
                    onClick={() => setAddOptions(prev => prev + 1)}
                    className='flex items-center gap-3 mt-2 text-gray-300'>
                    {/* <Checkbox disabled /> */}
                    <Select>
                        <SelectTrigger className="[&[data-placeholder]]:text-gray-400">
                            <SelectValue placeholder="Add Option" />
                        </SelectTrigger>
                    </Select>

                    {/* <div>Add more option</div> */}
                </div>
            </div>
        </div>
    )
}

export default DropDown