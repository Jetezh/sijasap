import { cn } from "../lib/utils";
import type { ButtonProps } from "../types";

function Button(props: ButtonProps) {
  const { title, classname, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        " font-medium bg-(--green-button) text-white rounded-sm hover:cursor-pointer hover:bg-(--green-button-hover) duration-300",
        classname,
      )}
    >
      {title}
    </button>
  );
}

export default Button;
