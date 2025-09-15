import React from 'react'
import cn from 'clsx'

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    className?: string;
}

function Modal({ isOpen, onClose, children, className }: ModalProps) {

    return (
        <div className={cn(`${!isOpen ? 'hidden' : ''} fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-11`, className)}>
            {isOpen && (
                <div className={cn(`bg-white lg:m-0 md:m-0 mx-5 p-6 rounded-lg shadow-lg text-black lg:text-2xl md:text-2xl text-base font-medium flex flex-col gap-5`, className)}>
                    {children}
                    <button onClick={onClose} className='bg-(--red-button) hover:bg-(--red-button-hover) hover:cursor-pointer duration-300 text-white px-4 py-2 rounded-md w-full'>Close</button>
                </div>
            )}
        </div>
    )
}

export default Modal