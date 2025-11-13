import { cn } from '../lib/utils'
import type { ButtonProps } from '../types'

function Button( props: ButtonProps) {
  return (
      <button type='submit' className={cn(' font-medium bg-(--green-button) text-white rounded-sm hover:cursor-pointer hover:bg-(--green-button-hover) duration-300', props.classname)}>{props.title}</button>
  )
}

export default Button