import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { get } from '../service';
import { toast } from 'sonner';
import LableComponent from './LableComponent';
import { Input } from '@/components/ui/input';
import { Controller, useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { getFormIdBySlug } from '@/features/forms/service';


interface BlockType {
    id: string;
    name: string;
    workspaceId: string;
    createdAt: Date;
    updatedAt: Date;
    formFields: {
        id: string;
        formId: string;
        blockId: number;
        blockName: string;
        blockIndex: number;
        blockQuestion: string;
        blockPlaceholder: string;
        blockOptions?: string[] | null;
        createdAt: Date;
        updatedAt: Date
    }[];
};


const SubmissionFormComponent = () => {
    console.log("loaded");
    

    let formId: string;
    let slug: string;

    const params = useParams();
    console.log("params", params);
    
    if(params.formId){
        formId = params.formId;
    }else if(params.slug){
        slug = params.slug
    }

    const [formBlocks, setFormBlocks] = useState<BlockType>();
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    const {
        register,
        formState: { errors },
        handleSubmit,
        control
    } = useForm<Record<string, string | number | Date | undefined | string[]>>({
        defaultValues: formBlocks
            ? formBlocks.formFields.reduce((acc, curVal) => {
                if (curVal.blockName === "short answer" || curVal.blockName === "long answer" || curVal.blockName === "email" || curVal.blockName === "link") {
                    acc[curVal.blockQuestion] = "";
                } else if (curVal.blockName === "number" || curVal.blockName === "phone") {
                    acc[curVal.blockQuestion] = 0

                } else if (curVal.blockName === "checkboxes" || curVal.blockName === "dropdown") {
                    acc[curVal.blockName] = [];//?
                }
                return acc;
            }, {} as Record<string, string | number | Date | undefined | string[]>)
            : {}
    });

    const handleSubmission: SubmitHandler<Record<string, string | number | Date | undefined | string[]>> = async (data) => {
        console.log(data);
        const res = formBlocks?.formFields.map(item => {
            return {
                formId: item.formId,
                formFieldId: item.id,
                answer: data[item.blockQuestion]
            }
        });
        console.log("final", res);

    }


    useEffect(() => {

        if(slug){
            const fetchFormId = async (slug: string) => {
                try {
                    const res = await getFormIdBySlug(slug);
                    if(res.statusCode === 200){
                        formId = res.data.id
                    }
                } catch (error: any) {
                    console.log(error);
                    toast.error(error?.response.data.message);
                }
            };
            fetchFormId(slug);
        };

        const fetchForm = async () => {
            try {
                const res = await get(formId!);
                setFormBlocks(res.data);
            } catch (error: any) {
                toast.error(error)
            }
        };
        fetchForm();
    }, []);

    return (
        <section className='flex flex-col items-center'>
            <form onSubmit={handleSubmit(handleSubmission)} className='w-72'>
                <div className='my-10'>
                    <h1 className='text-3xl font-bold text-gray-700'>{formBlocks?.name}</h1>
                </div>
                <div className='flex flex-col gap-4'>
                    {
                        formBlocks?.formFields.map(item => {

                            switch (item.blockName) {

                                case "short answer":
                                    return (
                                        <div key={item.id}>
                                            <LableComponent>{item.blockQuestion}</LableComponent>
                                            <Input
                                                className='shadow-md placeholder:capitalize'
                                                placeholder={item.blockPlaceholder}
                                                {...register(item.blockQuestion, { required: `${item.blockQuestion} is required` })} />
                                            {
                                                errors[item.blockQuestion] && (
                                                    <p className='text-red-600 text-xs my-1 capitalize'>{errors[item.blockQuestion]?.message}</p>
                                                )
                                            }
                                        </div>
                                    );

                                case "long answer":
                                    return (
                                        <div key={item.id}>
                                            <LableComponent>{item.blockQuestion}</LableComponent>
                                            <Textarea
                                                className='shadow-md placeholder:capitalize'
                                                placeholder={item.blockPlaceholder}
                                                {...register(item.blockQuestion, { required: `${item.blockQuestion} is required` })} />
                                            {
                                                errors[item.blockQuestion] && (
                                                    <p className='text-red-600 text-xs my-1 capitalize'>{errors[item.blockQuestion]?.message}</p>
                                                )
                                            }
                                        </div>
                                    )

                                case "email":
                                    return (
                                        <div key={item.id}>
                                            <LableComponent>{item.blockQuestion}</LableComponent>
                                            <Input
                                                className='shadow-md placeholder:capitalize'
                                                placeholder={item.blockPlaceholder}
                                                {...register(item.blockQuestion, {
                                                    required: `${item.blockQuestion} is required`,
                                                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email address" }
                                                })} />
                                            {
                                                errors[item.blockQuestion] && (
                                                    <p className='text-red-600 text-xs my-1 capitalize'>{errors[item.blockQuestion]?.message}</p>
                                                )
                                            }
                                        </div>
                                    )
                                case "phone":
                                    return (
                                        <div key={item.id}>
                                            <LableComponent>{item.blockQuestion}</LableComponent>
                                            <Input
                                                type='number'
                                                className='shadow-md placeholder:capitalize'
                                                placeholder={item.blockPlaceholder}
                                                {...register(item.blockQuestion, {
                                                    valueAsNumber: true,
                                                    required: `${item.blockQuestion} is required`,
                                                    validate: value =>
                                                        /^\d{10}$/.test(String(value)) || "phone number must be 10 digit"
                                                })} />
                                            {
                                                errors[item.blockQuestion] && (
                                                    <p className='text-red-600 text-xs my-1 capitalize'>{errors[item.blockQuestion]?.message}</p>
                                                )
                                            }
                                        </div>
                                    )

                                case "number":
                                    return (
                                        <div key={item.id}>
                                            <LableComponent>{item.blockQuestion}</LableComponent>
                                            <Input
                                                type='number'
                                                className='shadow-md placeholder:capitalize'
                                                placeholder={item.blockPlaceholder}
                                                {...register(item.blockQuestion, {
                                                    valueAsNumber: true,
                                                    required: `${item.blockQuestion} is required`,
                                                    validate: value =>
                                                        /^[1-9]\d*$/.test(String(value)) || "Enter a valid number"
                                                })} />
                                            {
                                                errors[item.blockQuestion] && (
                                                    <p className='text-red-600 text-xs my-1 capitalize'>{errors[item.blockQuestion]?.message}</p>
                                                )
                                            }
                                        </div>
                                    )

                                case "date":
                                    return (
                                        <div key={item.id}>
                                            <LableComponent>{item.blockQuestion}</LableComponent>
                                            <Controller
                                                control={control}
                                                name={item.blockQuestion}
                                                rules={{ required: `${item.blockQuestion} is required` }}
                                                render={({ field }) => (
                                                    <Popover open={open} onOpenChange={setOpen}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                id="date"
                                                                className="w-48 justify-between font-normal"
                                                            >
                                                                {date ? date.toLocaleDateString() : "Select date"}
                                                                <CalendarIcon />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={date}
                                                                captionLayout="dropdown"
                                                                onSelect={(date) => {
                                                                    field.onChange(date?.toISOString())
                                                                    setDate(date)
                                                                    setOpen(false)
                                                                }}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                )}>
                                            </Controller>
                                            {
                                                errors[item.blockQuestion] && (
                                                    <p className='text-red-600 text-xs my-1 capitalize'>{errors[item.blockQuestion]?.message}</p>
                                                )
                                            }
                                        </div>
                                    )

                                case "checkboxes":
                                    return (
                                        <div key={item.id}>
                                            <LableComponent>{item.blockQuestion}</LableComponent>
                                            <Controller
                                                name={item.blockQuestion}
                                                control={control}
                                                rules={{ required: `${item.blockQuestion} is required` }}
                                                render={({ field }) => {
                                                    const selectedValues = field.value as string[] | undefined || [];

                                                    const toggleOption = (option: string) => {
                                                        if (selectedValues.includes(option)) {
                                                            field.onChange(selectedValues.filter(v => v !== option));
                                                        } else {
                                                            field.onChange([...selectedValues, option]);
                                                        }
                                                    };

                                                    return (
                                                        <div className="flex flex-col gap-2">
                                                            {(item.blockOptions || []).map((option) => (
                                                                <label key={option} className="inline-flex items-center space-x-2">
                                                                    <Checkbox
                                                                        checked={selectedValues.includes(option)}
                                                                        onCheckedChange={() => toggleOption(option)}
                                                                    />
                                                                    <span className="select-none">{option}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    );
                                                }}
                                            />
                                            {errors[item.blockQuestion] && (
                                                <p className="text-red-600 text-xs my-1 capitalize">
                                                    {errors[item.blockQuestion]?.message}
                                                </p>
                                            )}
                                        </div>
                                    );

                                case "dropdown":
                                    return (
                                        <div key={item.id}>
                                            <LableComponent>{item.blockQuestion}</LableComponent>
                                            <Controller
                                                name={item.blockQuestion}
                                                control={control}
                                                rules={{ required: `${item.blockQuestion} is required` }}
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={
                                                            typeof field.value === "string"
                                                                ? field.value
                                                                : field.value != null
                                                                    ? String(field.value)
                                                                    : ""
                                                        }
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder={item.blockPlaceholder || "Select an option"} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {(item.blockOptions || []).map((option) => (
                                                                <SelectItem key={option} value={option}>
                                                                    {option}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            {errors[item.blockQuestion] && (
                                                <p className="text-red-600 text-xs my-1 capitalize">
                                                    {errors[item.blockQuestion]?.message}
                                                </p>
                                            )}
                                        </div>
                                    );

                                case "link":
                                    return (
                                        <div key={item.id}>
                                            <LableComponent>{item.blockQuestion}</LableComponent>
                                            <Input
                                                className='shadow-md placeholder:capitalize'
                                                placeholder={item.blockPlaceholder}
                                                {...register(item.blockQuestion, { required: `${item.blockQuestion} is required` })} />
                                            {
                                                errors[item.blockQuestion] && (
                                                    <p className='text-red-600 text-xs my-1 capitalize'>{errors[item.blockQuestion]?.message}</p>
                                                )
                                            }
                                        </div>
                                    );
                            }
                        })
                    }
                </div>
                <Button className='my-10 w-full'>Submit</Button>
            </form>
        </section>
    )
}

export default SubmissionFormComponent