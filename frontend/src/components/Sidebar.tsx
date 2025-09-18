import cn from 'clsx'

type LeftSidebarProps = {
  children?: React.ReactNode,
  className?: string,
}

function LeftSidebar({children, className}: LeftSidebarProps) {
  return (
    <div className={cn("text-left text-3xl font-medium px-4 py-2 bg-white border-r border-gray-200 fixed", className)}>
      {children}
    </div>
  )
}

type SidebarItemProps = {
  children?: React.ReactNode,
  className?: string,
  onClick?: () => void
}

function SidebarItem({children, className, onClick}: SidebarItemProps) {
  return (
    <div onClick={onClick} className={cn("flex items-center mb-2 px-5 py-4 rounded hover:bg-(--primary-color) hover:text-white cursor-pointer duration-300", className)}>
      {children}
    </div>
  )
}

export {LeftSidebar, SidebarItem};