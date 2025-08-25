import { footerNavLinks } from '@/lib/footerLinks'
import React from 'react'

const FooterNav = () => {
  return (
    <div>
        {
            footerNavLinks.map((item, i) => {
                return(
                    <div key={i} className='flex flex-col mb-4'>
                        <div className='text-base font-medium'>{item.name}</div>
                        <div>
                            {
                                item.links.map((item, i) => {
                                    return(
                                        <div key={i} className='text-gray-600 p-0.5'>{item}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default FooterNav