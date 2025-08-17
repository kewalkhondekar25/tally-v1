import React from 'react'

const PinkCard = ({ title, subtitle, url, urlName }: { 
    title: string, 
    subtitle: string, 
    url: string, 
    urlName: string 
}) => {
    return (
        <div className="border-2 border-[#f81ce5] rounded-lg shadow-sm shadow-[#f81ce5]">
            <div className="p-3 flex flex-col gap-1 text-gray-700">
                <p 
                    className="bg-gradient-to-r from-[#9441fa] to-[#f81ce0]
                            bg-clip-text text-transparent text-xl font-bold"
                    >
                    {title}
                </p>
                <p className="font-medium text-gray-600">
                    {subtitle}
                </p>
                <img src={url} alt="banner2" />
            </div>
        </div>
    )
}

export default PinkCard