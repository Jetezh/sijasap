import { cn } from "../lib/utils";

const HOURS = Array.from({ length: 24 }, (_, index) =>
  String(index).padStart(2, "0"),
);
const MINUTES = ["00", "10", "20", "30", "40", "50"];

type WibTimePickerProps<TName extends string = string> = {
  label: string;
  name: TName;
  value: string;
  minTime: string;
  maxTime: string;
  onChange: (name: TName, value: string) => void;
  className?: string;
  helperText?: string;
  showHelperText?: boolean;
  showTimezoneLabel?: boolean;
};

const parseTimeParts = (timeValue: string) => {
  if (!timeValue) {
    return { hours: "", minutes: "" };
  }

  const [hours, minutes] = timeValue.split(":");
  if (!hours || !minutes) {
    return { hours: "", minutes: "" };
  }

  return { hours, minutes };
};

const parseTimeToNumbers = (timeValue: string) => {
  const [hours, minutes] = timeValue.split(":").map(Number);
  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }
  return { hours, minutes };
};

function WibTimePicker<TName extends string = string>({
  label,
  name,
  value,
  minTime,
  maxTime,
  onChange,
  className,
  helperText,
  showHelperText = true,
  showTimezoneLabel = true,
}: WibTimePickerProps<TName>) {
  const { hours, minutes } = parseTimeParts(value);
  const minParts = parseTimeToNumbers(minTime);
  const maxParts = parseTimeToNumbers(maxTime);
  const minHour = minParts?.hours ?? 0;
  const maxHour = maxParts?.hours ?? 23;
  const hasValidRange =
    minParts !== null && maxParts !== null && minHour <= maxHour;
  const hourOptions = hasValidRange ? HOURS.slice(minHour, maxHour + 1) : HOURS;

  const getMinuteOptions = (selectedHour: string) => {
    if (!hasValidRange) {
      return MINUTES;
    }

    const parsedHour = Number(selectedHour);
    if (Number.isNaN(parsedHour)) {
      return MINUTES;
    }

    let start = 0;
    let end = 59;

    if (minParts && parsedHour === minHour) {
      start = minParts.minutes;
    }

    if (maxParts && parsedHour === maxHour) {
      end = maxParts.minutes;
    }

    if (start > end) {
      return [];
    }

    const filtered = MINUTES.filter((minute) => {
      const minuteValue = Number(minute);
      return minuteValue >= start && minuteValue <= end;
    });

    return filtered;
  };

  const minuteOptions = getMinuteOptions(hours);

  const handlePartChange = (part: "hours" | "minutes", partValue: string) => {
    if (!partValue) {
      onChange(name, "");
      return;
    }

    const current = parseTimeParts(value);
    const nextHours = part === "hours" ? partValue : current.hours || "00";
    const nextMinutes =
      part === "minutes" ? partValue : current.minutes || "00";
    const allowedMinutes =
      part === "hours" ? getMinuteOptions(nextHours) : minuteOptions;
    const adjustedMinutes = allowedMinutes.includes(nextMinutes)
      ? nextMinutes
      : (allowedMinutes[0] ?? "");

    if (!adjustedMinutes) {
      onChange(name, "");
      return;
    }

    onChange(name, `${nextHours}:${adjustedMinutes}`);
  };

  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span>{label}</span>
      <div className="border rounded-md p-2 flex items-center gap-2 bg-white">
        <select
          className="border rounded-md px-2 py-1"
          value={hours}
          onChange={(event) => handlePartChange("hours", event.target.value)}
        >
          <option value="">HH</option>
          {hourOptions.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <span>:</span>
        <select
          className="border rounded-md px-2 py-1"
          value={minutes}
          onChange={(event) => handlePartChange("minutes", event.target.value)}
        >
          <option value="">MM</option>
          {minuteOptions.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
        {showTimezoneLabel && (
          <span className="text-xs text-gray-500">WIB (24 jam)</span>
        )}
      </div>
      {showHelperText && (
        <span className="text-xs text-gray-500">
          {helperText ?? `Jam layanan ${minTime} - ${maxTime} WIB`}
        </span>
      )}
    </label>
  );
}

export default WibTimePicker;
