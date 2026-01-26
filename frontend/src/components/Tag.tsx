import { cn } from "../lib/utils";
import type { TagProps } from "../types";

function Tag({ title, classname, key, style }: TagProps) {
  return (
    <div
      className={cn(
        "inline-flex w-fit px-3 py-1 rounded-lg font-bold bg-amber-300",
        classname,
      )}
      key={key}
      style={style}
    >
      {title}
    </div>
  );
}

export default Tag;
