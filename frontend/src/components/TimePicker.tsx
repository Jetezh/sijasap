type TimePickerProps = { title: string }

function TimePicker({ title }: TimePickerProps) {
  return (
    <div className="flex flex-col flex-1 gap-3 text-left">
        <label>{title}</label>
        <input type="time" id={title} className="bg-white px-7 py-7 shadow-md"/>
    </div>
  )
}

export default TimePicker