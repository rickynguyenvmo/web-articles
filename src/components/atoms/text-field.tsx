import React from 'react'
import { twMerge } from 'tailwind-merge'

type TextFieldProps = React.HTMLProps<HTMLInputElement> & {
  wrapperClassName?: string
  label?: string
  labelClassName?: string
  helperText?: string
  helperTextClassName?: string
  errorText?: string
  errorTextClassName?: string
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      wrapperClassName,
      label,
      labelClassName,
      className,
      helperText,
      helperTextClassName,
      errorText,
      errorTextClassName,
      ...props
    },
    ref
  ) => (
    <label className={twMerge('', wrapperClassName)}>
      {label ? (
        <div
          className={twMerge(
            'mb-1 text-gray-600 text-sm font-medium',
            labelClassName
          )}
        >
          {label}
          {props.required && <span className="text-red-500">*</span>}
        </div>
      ) : (
        <></>
      )}
      <input
        ref={ref}
        className={twMerge(
          'px-3 border h-12 w-full border-gray-400 rounded transition-all text-black placeholder-gray-400 outline-none !outline-1',
          'focus:outline-sky-500 focus:shadow-none focus:outline-offset-0',
          errorText
            ? 'border-red-500 focus:border-red-500 focus:outline-red-500 focus:shadow-red-500'
            : '',
          className
        )}
        {...props}
      />
      {errorText ? (
        <div
          className={twMerge('mt-1 text-red-500 text-sm', errorTextClassName)}
        >
          {errorText}
        </div>
      ) : (
        <></>
      )}
      {helperText ? (
        <div
          className={twMerge('mt-1 text-gray-600 text-sm', helperTextClassName)}
        >
          {helperText}
        </div>
      ) : (
        <></>
      )}
    </label>
  )
)
