import { cn } from '../lib/utils'

type TimePickerProps = { title: string, classname?: string }

function TimePicker({ title, classname }: TimePickerProps) {
  return (
    <div className={cn("flex flex-col gap-3 text-left lg:p-0 md:p-1.5 p-1", classname)}>
        <label>{title}</label>
        <input type="time" id={title} className="bg-white lg:p-7 md:p-5 p-3 shadow-md"/>
    </div>
  )
}

export default TimePicker