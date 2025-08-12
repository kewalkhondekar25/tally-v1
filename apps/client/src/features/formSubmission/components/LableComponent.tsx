import { Label } from '@/components/ui/label'
import React from 'react'

const LableComponent = ({ children }: { children: React.ReactNode}) => {
  return (
    <Label className='my-2 capitalize text-lg'>
        {children}
    </Label>
  )
}

export default LableComponent