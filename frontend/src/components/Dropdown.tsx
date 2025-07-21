import React, { useState } from 'react'
import useClickOutside from '../hooks/useClickOutside';

function Dropdown({ children, trigger }: { children : React.ReactNode, trigger: React.ReactNode}) {
    const [ show, setShow ] = useState(false);
    const dropRef = useClickOutside(() => setShow(false));

    return (
        <div 
        onClick={() => setShow((curr) => !curr)}
        className='w-fit relative z-17'
        ref={dropRef}>
            <div>{trigger}</div>
            {show && <ul className='min-w-max absolute right-0 lg:mt-12 md:mt-8 mt-5 bg-white divide-y divide-gray-100 shadow-xl overflow-hidden'>{children}</ul>}
        </div>
    )
}



export default Dropdown;