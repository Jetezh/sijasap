type DatePickerProps = { title: string }

function DatePicker({ title }: DatePickerProps ) {
  return (
    <div className="flex flex-col flex-1 gap-3 text-left">
        <label>{title}</label>
        <input type='date' id={title} className="bg-white px-7 py-5 shadow-md" />
    </div>
  )
}

export default DatePicker