import { cn } from '../lib/utils'
import type { AlertsProps } from '../types'

function Alerts(props: AlertsProps) {
  return (
    <div className={cn("w-full bg-(--alert-color) text-(--text-alert-color) lg:px-5 lg:py-4 md:px-4 md:py-3 px-3 py-2 rounded-md lg:text-2xl md:text-2xl text-base", props.className,)}>
        {props.children}
    </div>
  )
}

export default Alerts;