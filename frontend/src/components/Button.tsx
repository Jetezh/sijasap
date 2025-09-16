import cn from 'clsx'

type ButtonProps = { title: string, classname?: string }

function Button({ title, classname }: ButtonProps) {
  return (
      <button type='submit' className={cn('lg:text-3xl md:text-3xl text-lg font-medium bg-(--green-button) text-white rounded-sm hover:cursor-pointer hover:bg-(--green-button-hover) duration-300', classname)}>{title}</button>
  )
}

export default Button