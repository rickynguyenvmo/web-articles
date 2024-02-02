import { Link, To } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

type LinkButtonProps = {
  to: To
  children?: React.ReactNode
  className?: string
}

export const LinkButton = (props: LinkButtonProps) => {
  return (
    <Link
      className={twMerge(
        'block font-medium transition-colors hover:text-sky-500',
        props.className
      )}
      to={props.to}
    >
      {props.children}
    </Link>
  )
}
