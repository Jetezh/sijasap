import cn from 'clsx'
import { NavLink } from 'react-router-dom'

type LeftSidebarProps = {
  children?: React.ReactNode,
  className?: string,
}

function LeftSidebar({children, className}: LeftSidebarProps) {
  return (
    <div className={cn("text-left text-3xl font-medium px-4 py-2 bg-white border-r border-gray-200", className)}>
      {children}
    </div>
  )
}

type SidebarItemProps = {
  children?: React.ReactNode,
  className?: string,
  to?: string
  onClick?: () => void
}

function SidebarItem({children, className, to, onClick}: SidebarItemProps) {
  if(to) {
    return (
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          cn(
            "flex items-center mb-2 px-5 py-4 rounded hover:bg-green-100 hover:text-black cursor-pointer duration-300",
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
        "flex items-center mb-2 px-5 py-4 rounded hover:bg-green-100 hover:text-black cursor-pointer duration-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export {LeftSidebar, SidebarItem};