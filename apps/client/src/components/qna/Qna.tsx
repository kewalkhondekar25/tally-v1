import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Link } from 'react-router-dom';

const Qna = () => {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger className='text-base'>Is Typely really free?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className='text-base'>
                        Yes! Born out of frustration with expensive form builders, Typely offers unlimited forms and submissions for free within our fair use guidelines. You can get started right away and create forms using our advanced features — all for free and without time restrictions.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className='text-base'>Are Typely forms secure?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className='text-base'>
                        Yes, Typely takes security seriously. We store all form data in India. Your data is encrypted both in transit and at rest, and we provide you complete control over the information you collect.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className='text-base'>How does Typely compare to other form builders?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className='text-base'>
                        Unlike most form builders that limit submissions or restrict advanced features to premium plans, Typely offers unlimited forms and submissions for free.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger className='text-base'>How can I get started?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className='text-base'>
                        You can start creating your first form right away by heading over to our
                        <Link to="/signup">signup page</Link> to create your account. 
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default Qna