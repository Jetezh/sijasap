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
    <div className={cn("w-full bg-(--alert-color) text-(--text-alert-color) px-5 py-4 rounded-md text-2xl", className,)}>
        {children}
    </div>
  )
}

export default Alerts;