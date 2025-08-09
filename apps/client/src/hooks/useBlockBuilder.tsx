import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { Input } from '@/components/ui/input';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import BlockTool from '@/features/forms/components/BlockTool';
import InputComponent from '@/features/forms/components/ui/Input';
import TextAreaComponent from '@/features/forms/components/ui/TextArea';
import CheckBox from '@/features/forms/components/ui/CheckBox';
import DropDown from '@/features/forms/components/ui/DropDown';
import Number from '@/features/forms/components/ui/Number';
import Email from '@/features/forms/components/ui/Email';
import Phone from '@/features/forms/components/ui/Phone';
import Link from '@/features/forms/components/ui/Link';
import Upload from '@/features/forms/components/ui/Upload';
import Date from '@/features/forms/components/ui/Date';
import Time from '@/features/forms/components/ui/Time';

const useBlockBuilder = () => {

    const { blockName } = useAppSelector(state => state.blockpicker);

    if (blockName.length < 1) {
        return;
    };

    return (
        <>
            {
                blockName.map((item, i) => {

                    switch(item.name){

                        case "short answer":
                            return <InputComponent key={i} i={i}/>;

                        case "long answer":
                            return <TextAreaComponent key={i} i={i}/>
                        
                        case "checkboxes":
                            return <CheckBox key={i} i={i}/>
                        
                        case "dropdown":
                            return <DropDown key={i} i={i}/> 
                            
                        case "number":
                            return <Number key={i} i={i}/>

                        case "email":
                            return <Email key={i} i={i}/>

                        case "phone":
                            return <Phone key={i} i={i}/>

                        case "link":
                            return <Link key={i} i={i}/>

                        case "file upload":
                            return <Upload key={i} i={i}/>

                        case "date":
                            return <Date key={i} i={i}/>

                        case "time":
                            return <Time key={i} i={i}/>

                        default:
                            return <h3>No Blocks Found</h3>
                        
                    }
                })
            }
        </>
    );
};

export default useBlockBuilder;