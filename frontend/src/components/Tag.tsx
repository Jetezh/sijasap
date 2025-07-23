import cn from 'clsx'

type TagProps = { title: string, classname: string }

function Tag({title, classname}: TagProps) {
  return (
    <div className={cn("px-3 py-2 bg-yellow-400 rounded-full font-medium text-2xl", classname)}>
        {title}
    </div>
  )
}

export default Tag