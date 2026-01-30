import { cn } from '../lib/utils'
import { NavLink } from 'react-router-dom'
import type { LeftSidebarProps, SidebarItemProps } from '../types'


function LeftSidebar(props: LeftSidebarProps) {

  const { children, className } = props;

  return (
    <div className={cn("text-left text-3xl font-medium px-4 py-2 bg-white border-r border-gray-200", className)}>
      {children}
    </div>
  )
}

function SidebarItem(props: SidebarItemProps) {

  const {children, className, to, onClick} = props;

  if(to) {
    return (
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          cn(
            "flex items-center mb-2 px-5 rounded hover:bg-green-100 hover:text-black cursor-pointer duration-200",
            isActive && "bg-[var(--primary-color)] text-white",
            className
          )
        }
        onClick={onClick}
      >
        {children}
      </NavLink>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center mb-2 px-5 rounded hover:bg-green-100 hover:text-black cursor-pointer duration-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export {LeftSidebar, SidebarItem};