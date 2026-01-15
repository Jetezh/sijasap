import { cn } from "../lib/utils";
import type { ModalProps } from "../types";

function Modal({
  isOpen,
  onClose,
  children,
  className,
  contentClassName,
  showCloseButton = true,
}: ModalProps) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-11",
        !isOpen && "hidden",
        className,
      )}
      onClick={onClose}
    >
      {isOpen && (
        <div
          className={cn(
            "bg-white lg:m-0 md:m-0 mx-5 p-6 rounded-lg shadow-lg text-black lg:text-2xl md:text-2xl text-base font-medium flex flex-col gap-5",
            contentClassName,
          )}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="bg-(--red-button) hover:bg-(--red-button-hover) hover:cursor-pointer duration-300 text-white px-4 py-2 rounded-md w-full"
            >
              Close
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Modal;
