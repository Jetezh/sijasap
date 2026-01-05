import { cn } from "../lib/utils";

type TagProps = { title: string; classname?: string; key?: string };

function Tag({ title, classname, key }: TagProps) {
  return (
    <div
      className={cn(
        "px-3 py-2 bg-yellow-400 rounded-full font-medium",
        classname,
      )}
      key={key}
    >
      {title}
    </div>
  );
}

export default Tag;
