import { cn } from "../lib/utils";
import type { DatePickerProps } from "../types";

function DatePicker(props: DatePickerProps) {
  const { title, classname, value, onChange, min } = props;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 text-left lg:p-0 md:p-1.5 p-1",
        classname,
      )}
    >
      <label>{title}</label>
      <input
        type="date"
        id={title}
        value={value}
        onChange={onChange}
        min={min}
        className="bg-white lg:p-7 md:p-5 p-3 shadow-md"
      />
    </div>
  );
}

export default DatePicker;
