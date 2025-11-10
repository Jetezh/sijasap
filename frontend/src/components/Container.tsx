import React from 'react'
import cn from 'clsx'

type containerProps = {
  children?: React.ReactNode;
  className?: string;
}

function Container(props: containerProps) {
  return (
    <div className={cn("flex flex-col bg-white p-6 rounded-md shadow-(--card-shadow) gap-0 mt-3", props.className)}>
        {props.children}
    </div>
  )
}

export default Container