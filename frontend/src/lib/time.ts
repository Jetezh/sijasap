export const SERVICE_TIME = {
  minTime: "07:00",
  maxStartTime: "17:20",
  maxEndTime: "18:00",
  minDurationMinutes: 40,
  minuteStep: 10,
} as const;

export const timeToMinutes = (timeValue: string) => {
  if (!timeValue) {
    return null;
  }
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
  return hours * 60 + minutes;
};

export const formatWibDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getWibNow = () => {
  const now = new Date();
  return new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
};

export const roundUpMinutes = (totalMinutes: number, step: number) => {
  if (step <= 0) {
    return totalMinutes;
  }
  return Math.ceil(totalMinutes / step) * step;
};

export const minutesToTimeString = (totalMinutes: number) => {
  const clamped = Math.max(0, Math.min(23 * 60 + 59, totalMinutes));
  const hours = String(Math.floor(clamped / 60)).padStart(2, "0");
  const minutes = String(clamped % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
};
