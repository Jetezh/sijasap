import { cn } from "../lib/utils";
import type { ButtonProps } from "../types";

function Button(props: ButtonProps) {
  const { children, classname, onClick, type } = props;

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={cn(
        " font-medium bg-(--green-button) text-white rounded-sm hover:cursor-pointer hover:bg-(--green-button-hover) duration-300",
        classname,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
