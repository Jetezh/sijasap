import cn from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function LeftSidebar({children, title, className}: {children?: React.ReactNode, title?: string, className?: string}) {
  return (
    <div className={cn("text-left text-3xl font-medium px-4 py-2 bg-white border-r border-gray-200", className)}>
      <div className="px-5 py-4 border-b-3 mb-2 flex gap-5 items-center"><FontAwesomeIcon icon={faBars} className='hover:cursor-pointer' />{title}</div>
      {children}
    </div>
  )
}

function SidebarItem({children, className, onClick}: {children?: React.ReactNode, className?: string, onClick?: () => void}) {
  return (
    <div onClick={onClick} className={cn("mb-2 px-5 py-4 rounded hover:bg-(--primary-color) hover:text-white cursor-pointer duration-300", className)}>
      {children}
    </div>
  )
}

export {LeftSidebar, SidebarItem};