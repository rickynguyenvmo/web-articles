import React from 'react'
import { twMerge } from 'tailwind-merge'

type ContainerProps = {
  className?: string
  children?: React.ReactNode
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => (
    <div
      ref={ref}
      className={twMerge(
        'px-4 transition-[padding] duration-300 md:px-8 lg:w-[60rem] lg:px-0 lg:mx-auto xl:w-[67.75rem]',
        props.className
      )}
    >
      {props.children}
    </div>
  )
)
