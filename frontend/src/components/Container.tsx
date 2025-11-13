import { cn } from '../lib/utils'
import type { containerProps } from '../types'

function Container(props: containerProps) {
  return (
    <div className={cn("flex flex-col bg-white p-6 rounded-md shadow-(--card-shadow) gap-0 mt-3", props.className)}>
        {props.children}
    </div>
  )
}

export default Container