import { cn } from '../lib/utils'
import type { ModalProps } from '../types'

function Modal({ isOpen, children, className, contentClassName }: ModalProps) {

    return (
        <div className={cn("fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-11", !isOpen && "hidden", className)}>
            {isOpen && (
                <div className={cn("bg-white lg:m-0 md:m-0 mx-5 p-6 rounded-lg shadow-lg text-black lg:text-2xl md:text-2xl text-base font-medium flex flex-col gap-5", contentClassName)}>
                    {children}
                </div>
            )}
        </div>
    )
}

export default Modal