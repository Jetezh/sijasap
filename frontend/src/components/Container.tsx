import React from 'react'
import cn from 'clsx'

function Container({children, className}: {children?: React.ReactNode, className?: string}) {
  return (
    <div className={cn("flex flex-col bg-white p-6 rounded-md shadow-(--card-shadow) gap-0 mt-3", className)}>
        {children}
    </div>
  )
}

export default Container