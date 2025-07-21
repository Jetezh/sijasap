import React from "react";

function DropdownItem({ children, callbackFn }: {children: React.ReactNode, callbackFn?: React.MouseEventHandler<HTMLElement> }) {
    return <li onClick={callbackFn} className='flex lg:gap-5 md:gap-4 gap-3 items-center lg:px-6 lg:py-4 md:px-4 md:py-3 px-3 py-2 lg:text-3xl md:text-2xl text-sm font-medium text-gray-800 hover:bg-(--primary-color) hover:text-white duration-300 cursor-pointer'>{children}</li>
}

export default DropdownItem;