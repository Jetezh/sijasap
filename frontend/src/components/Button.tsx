import cn from 'clsx'

type ButtonProps = { title: string, classname?: string }

function Button({ title, classname }: ButtonProps) {
  return (
    <div className="">
          <button type='submit' className={cn('text-3xl font-medium bg-(--green-button) text-white h-full px-20 py-5 rounded-sm hover:cursor-pointer hover:bg-(--green-button-hover) duration-300', classname)}>{title}</button>
    </div>
  )
}

export default Button