import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  [
    'flex items-center font-medium px-3 py-1 rounded-xl border-[1px] shadow-[0_0_0_1px] shadow-transparent transition-shadow duration-300',
    'hover:shadow-[var(--button-color)]',
    'disabled:opacity-50 disabled:pointer-events-none'
  ],
  {
    variants: {
      variant: {
        filled:
          'bg-[var(--button-color)] border-[var(--button-color)] text-white',
        outline:
          'bg-transparent border-[var(--button-color)] text-[var(--button-color)]'
      },
      color: {
        orange: `[--button-color:--color-orange-500]`,
        red: '[--button-color:--color-red-600]',
        green: '[--button-color:--color-green-600]',
        gray: '[--button-color:--color-gray-500]',
        blue: '[--button-color:--color-sky-500]'
      },
      align: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
      }
    },
    defaultVariants: {
      variant: 'filled',
      color: 'blue',
      align: 'center'
    }
  }
)

type ButtonProps = VariantProps<typeof buttonVariants> &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
  }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, color, className, children, leftIcon, rightIcon, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, color, className })}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    )
  }
)
