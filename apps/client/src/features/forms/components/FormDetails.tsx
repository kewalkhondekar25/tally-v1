import React, { useEffect, useState } from 'react';
import { Outlet, useParams, Link, NavLink } from 'react-router-dom';
import { getForm } from '../service';
import { toast } from 'sonner';
import type { File } from '@/types';
import { Link as LinkIcon } from 'lucide-react';

const FormDetails = () => {

    const { formId } = useParams();

    const [form, setForm] = useState<File>();
    const nav = ["summary", "submissions", "share", "integrations"];

    useEffect(() => {

        const fetchForm = async () => {
            try {
                const form = await getForm(formId!);
                if (form.statusCode === 200) {
                    setForm(form.data);
                    toast.success(form.message)
                };
            } catch (error: any) {
                toast.error(error.response.data.message)
            }
        };
        fetchForm()
    }, []);

    return (
        <section className='flex flex-col justify-center items-center'>
            <div
                className='flex justify-between items-center 
                mt-10 w-72'>
                <h3 className='text-3xl font-bold text-gray-700 my-5'>{form?.name}</h3>
                <Link to={`share`}>
                    <LinkIcon className='h-5' />
                </Link>
            </div>
            <div
                className='flex gap-2 
                capitalize text-gray-500 font-semibold text-sm
                mt-5'>
                {
                    nav.map((item, i) => {
                        return (
                            <NavLink key={i} to={`${item}`}
                                className={
                                    ({ isActive }: { isActive: boolean }) => isActive ? 
                                    "text-black underline underline-offset-4" : ""}>
                                <span>{item}</span>
                            </NavLink>
                        )
                    })
                }
            </div>
            <Outlet />
        </section>
    );
};

export default FormDetails;