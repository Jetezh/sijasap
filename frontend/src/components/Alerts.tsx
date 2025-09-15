import React  from 'react'
import { cn } from '../lib/utils'

function Alerts({
    children, 
    className
}: {
    children: React.ReactNode, 
    className?: string
}) {
  return (
    <div className={cn("w-full bg-(--alert-color) text-(--text-alert-color) lg:px-5 lg:py-4 md:px-4 md:py-3 px-3 py-2 rounded-md lg:text-2xl md:text-2xl text-base", className,)}>
        {children}
    </div>
  )
}

export default Alerts;