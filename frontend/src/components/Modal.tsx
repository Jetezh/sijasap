import React from 'react'
import cn from 'clsx'

type ModalProps = {
    isOpen: boolean;
    children?: React.ReactNode;
    className?: string;
}

function Modal({ isOpen, children, className }: ModalProps) {

    return (
        <div className={cn(`${!isOpen ? 'hidden' : ''} fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-11`, className)}>
            {isOpen && (
                <div className={cn(`bg-white lg:m-0 md:m-0 mx-5 p-6 rounded-lg shadow-lg text-black lg:text-2xl md:text-2xl text-base font-medium flex flex-col gap-5`, className)}>
                    {children}
                </div>
            )}
        </div>
    )
}

export default Modal