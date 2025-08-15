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
import { useParams } from 'react-router-dom';
import { getFormResponses } from '../service';
import { toast } from 'sonner';
import { type FormQuesAns, type FormSubmissionType } from '@/types';


const FormSubmission = () => {

    const { formId } = useParams();
    const [submissions, setSubmissions] = useState<FormSubmissionType>();

    useEffect(() => {
        const fetchFormResponse = async (formId: string) => {
            try {
                const response = await getFormResponses(formId);
                if(response.statusCode === 200){
                    setSubmissions(response.data);
                    toast.success(response.message);
                }
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        };
        fetchFormResponse(formId!);
    }, []);
    
    return (
        <section className="flex justify-center p-4 w-72">
            <Table>
                <TableCaption >List of Submissions</TableCaption>
                <TableHeader >
                    <TableRow>
                        {
                            submissions?.formFields.map((item, i) => {
                                return(
                                    <TableHead key={i}>{item.blockQuestion}</TableHead>
                                )
                            })
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        submissions?.formFields.map(item => item.fieldResponses.map((item, i) => {
                            return(
                                <TableRow key={i}>
                                    <TableCell>{item.answer}</TableCell>
                                </TableRow>
                            )
                        }))
                    }
                </TableBody>
            </Table>
        </section>


    )
}

export default FormSubmission