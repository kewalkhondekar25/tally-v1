import React from 'react'
import { Button } from '../ui/button'
import { planFeatures } from '@/lib/price'

const PriceCard = ({ plan, price }: {
    plan: string,
    price: string,

}) => {
    return (
        <div className="border-1 shadow-sm shadow-gray-500 rounded-lg flex-1">
            <div className="p-3">
                <div className="flex justify-between items-center">
                    <p className="text-lg font-bold capitalize">{plan}</p>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center">
                            <span className="text-2xl text-gray-500">$</span>
                            <span className="text-3xl font-bold">{price}</span>
                        </div>
                        <p className="text-gray-500">per month</p>
                    </div>
                </div>

                <Button
                    className={`${plan === "pro" ?
                        " bg-[#f81ce5] w-full my-5" :
                        "bg-[#0070d7] w-full my-5"}`}>Get started</Button>

                {
                    planFeatures.filter(item => item.plan === plan).map(item => {
                        return (
                            <div key={item.id} className="flex flex-col my-5 gap-1">
                                {<item.icon 
                                    className={`${item.plan === "pro" ? 
                                    "text-[#f81ce5]" : `${item.id === 7 ? "text-[#f81ce5]" : "text-[#0070d7]"}`}`}/>}
                                <div>
                                    <p className="text-sm font-semibold">{item.title}
                                        <span className="text-sm text-gray-500"> {item.subtitle}</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PriceCard