import cn from 'clsx'

type DatePickerProps = { title: string, classname?: string }

function DatePicker({ title, classname }: DatePickerProps ) {
  return (
    <div className={cn("flex flex-col gap-3 text-left lg:p-0 md:p-1.5 p-1", classname)}>
        <label>{title}</label>
        <input type='date' id={title} className="bg-white lg:p-7 md:p-5 p-3 shadow-md" />
    </div>
  )
}

export default DatePicker