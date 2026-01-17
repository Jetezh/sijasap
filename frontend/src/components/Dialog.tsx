import { cn } from "../lib/utils";
import type { DialogProps } from "../types";

const variantStyles = {
  info: "border-blue-200 bg-blue-50 text-blue-800",
  success: "border-green-200 bg-green-50 text-green-800",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
  error: "border-red-200 bg-red-50 text-red-800",
};

function Dialog({
  isOpen,
  title,
  message,
  variant = "info",
  onClose,
  onConfirm,
  confirmText = "OK",
  cancelText = "Batal",
  showCancel = false,
  children,
  className,
  contentClassName,
}: DialogProps) {
  const resolvedVariant = variantStyles[variant] ?? variantStyles.info;

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
            "bg-white lg:m-0 md:m-0 mx-5 p-6 rounded-lg shadow-lg text-black lg:text-2xl md:text-2xl text-base font-medium flex flex-col gap-5 w-full max-w-lg",
            contentClassName,
          )}
          onClick={(event) => event.stopPropagation()}
        >
          {(title || message) && (
            <div className={cn("rounded-md border p-4", resolvedVariant)}>
              {title && <h2 className="text-lg font-semibold">{title}</h2>}
              {message && (
                <p className="text-sm mt-1 leading-relaxed">{message}</p>
              )}
            </div>
          )}

          {children}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            {showCancel && (
              <button
                type="button"
                onClick={onClose}
                className="bg-(--button-gray) text-black rounded-md px-4 py-2 hover:cursor-pointer hover:opacity-90 duration-300"
              >
                {cancelText}
              </button>
            )}
            <button
              type="button"
              onClick={onConfirm ?? onClose}
              className="bg-(--green-button) text-white rounded-md px-4 py-2 hover:cursor-pointer hover:bg-(--green-button-hover) duration-300"
            >
              {confirmText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dialog;
