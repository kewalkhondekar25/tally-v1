import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getFormResponses } from '../service';
import { toast } from 'sonner';
import { type FormSubmissionType } from '@/types';
import { Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';


const FormSubmission = () => {

    const navigate = useNavigate();
    const { formId } = useParams();
    const [submissions, setSubmissions] = useState<FormSubmissionType>();

    const questions = submissions?.formFields.map(item => item.blockQuestion) ?? [];
    const rows: Record<string, Record<string, any>> = {};

    submissions?.formFields.forEach(fields => fields.fieldResponses
        .forEach(res => {
            if (!rows[res.responsesId]) {
                rows[res.responsesId] = {};
            };
            rows[res.responsesId][fields.blockQuestion] = res.answer;
        }));

    const rowArr = Object.values(rows);

    useEffect(() => {

        const fetchFormResponse = async (formId: string) => {
            try {
                const response = await getFormResponses(formId);
                if (response.statusCode === 200) {
                    setSubmissions(response.data);
                    toast.success(response.message);
                }
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        };
        fetchFormResponse(formId!);
    }, [formId]);

    if (Object.keys(rows).length < 1) {
        return (
            <section>
                <div className='flex flex-col justify-center items-center min-h-screen mx-5 
                text-center gap-3'>
                    <div className='flex justify-center items-center bg-[#dfedfa] 
                    h-14 w-14 rounded-full'>
                        <Inbox className='text-[#0070d7] h-10 w-10 p-1' />
                    </div>
                    <h1 className='text-2xl font-semibold'>No completed submissions yet</h1>
                    <p className='text-gray-500'>Your form is published and ready to be shared with the world!</p>
                    <Link to={`/form/${formId}/share`}>
                        <Button className='mt-5 bg-[#0070d7]'>Share</Button>
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <Table className='mt-10'>
            <TableCaption>Submited Responses</TableCaption>
            <TableHeader>
                <TableRow>
                    {
                        questions?.map((item, i) => {
                            return (
                                <TableHead key={i}>{item}</TableHead>
                            )
                        })
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {rowArr.map((row, i) => (
                    <TableRow key={i}>
                        {
                            questions.map((q, i) => (
                                <TableCell className={`${q === ""}`} key={i}>
                                    {
                                        Array.isArray(row[q]) ? 
                                        row[q].join(", ") : 
                                        typeof row[q] === "string" && !isNaN(Date.parse(row[q])) ? 
                                        new Date(row[q]).toLocaleDateString("en-IN", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric"
                                        }) : String(row[q])
                                    }
                                </TableCell>
                            ))
                        }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default FormSubmission