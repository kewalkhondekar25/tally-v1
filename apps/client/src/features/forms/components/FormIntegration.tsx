import React from 'react';
import { tools } from '../data/tools';

const FormIntegration = () => {



    return (
        <section className='flex flex-col items-center mx-3'>
            <div className='my-5'>
                <h1 className='text-xl font-semibold'>Discover Integrations</h1>
                <p className='mt-3 text-sm text-gray-700'>Make Tally even more powerful 
                    by using these tools. Check out our roadmap for upcoming integrations 
                    and to request new ones.
                </p>
            </div>
            {
                tools.map((item, i) => {
                    return(
                        <div className='flex flex-col justify-start w-full my-5' key={i}>
                            <img className='h-10 w-10' src={item.img} alt={`${item.name}`} />
                            <div className='my-3'>
                                <div className='capitalize font-semibold'>
                                    {item.name}
                                </div>
                                <p className='text-sm text-gray-500 font-normal'> 
                                    {item.name === "webhooks" ? " Send events for new submissions to HTTP endpoints" : `Send submission to ${item.name}` } 
                                </p>
                            </div>
                            <div className='text-[#0070d7] font-semibold'>Connect</div>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default FormIntegration