import { cn } from '../lib/utils'
import type { DatePickerProps } from '../types'

function DatePicker(props: DatePickerProps ) {
  return (
    <div className={cn("flex flex-col gap-3 text-left lg:p-0 md:p-1.5 p-1", props.classname)}>
        <label>{props.title}</label>
        <input type='date' id={props.title} className="bg-white lg:p-7 md:p-5 p-3 shadow-md" />
    </div>
  )
}

export default DatePicker