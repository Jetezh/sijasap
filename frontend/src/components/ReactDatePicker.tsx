import DatePicker from "react-datepicker";
import { cn } from "../lib/utils";
import type { DatePickerProps } from "../types";
import "./DatePicker.css";
import "react-datepicker/dist/react-datepicker.css";

function ReactDatePicker(props: DatePickerProps) {
  const { title, classname, value, onChange, min } = props;
  const parseDateValue = (dateValue: string) => {
    if (!dateValue) {
      return null;
    }

    const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateValue);
    if (isoMatch) {
      const [, year, month, day] = isoMatch;
      return new Date(Number(year), Number(month) - 1, Number(day));
    }

    const dmyMatch = /^(\d{2})-(\d{2})-(\d{4})$/.exec(dateValue);
    if (dmyMatch) {
      const [, day, month, year] = dmyMatch;
      return new Date(Number(year), Number(month) - 1, Number(day));
    }

    return null;
  };

  const selectedDate = parseDateValue(value);
  const minDate = min ? (parseDateValue(min) ?? undefined) : undefined;

  const formatDateValue = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 text-left lg:p-0 md:p-1.5 p-1",
        classname,
      )}
    >
      <label>{title}</label>
      <DatePicker
        id={title}
        selected={selectedDate}
        onChange={(date) => onChange(date ? formatDateValue(date) : "")}
        minDate={minDate}
        dateFormat="dd-MM-yyyy"
        placeholderText="DD-MM-YYYY"
        className="bg-white lg:p-7 md:p-5 p-3 shadow-md text-lg md:text-xl lg:text-2xl w-full"
        calendarClassName="datepicker-calendar"
      />
    </div>
  );
}

export default ReactDatePicker;
