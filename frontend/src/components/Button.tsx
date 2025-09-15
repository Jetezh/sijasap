import cn from 'clsx'

type ButtonProps = { title: string, classname?: string }

function Button({ title, classname }: ButtonProps) {
  return (
      <button type='submit' className={cn('lg:text-3xl md:text-3xl text-lg font-medium bg-(--green-button) text-white h-full lg:px-20 lg:py-5 md:px-17 md:py-3 px-12 py-3 rounded-sm hover:cursor-pointer hover:bg-(--green-button-hover) duration-300', classname)}>{title}</button>
  )
}

export default Button