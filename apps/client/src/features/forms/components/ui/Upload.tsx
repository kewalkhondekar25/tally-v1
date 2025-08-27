import React from 'react'
import BlockTool from '../BlockTool';
import Question from './Question';
import { Input } from '@/components/ui/input';
import { Link as LinkIcon, Upload as UploadIcon } from 'lucide-react';

const Upload = ({ i }: { i: number }) => {
  return (
    <div key={i} className='flex justify-center items-center mt-3'>
            <BlockTool i={i} />
            <div>
                {/* <Question /> */}
                    <Input
                        className='placeholder:text-gray-400 text-gray-400 px-1 w-48'
                        type='file'
                    />
            </div>
        </div>
  );
};

export default Upload;