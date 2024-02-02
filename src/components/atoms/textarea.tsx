import React from 'react'
import { twMerge } from 'tailwind-merge'

type TextareaProps = React.HTMLProps<HTMLTextAreaElement> & {
  wrapperClassName?: string
  label?: string
  labelClassName?: string
  helperText?: string
  helperTextClassName?: string
  errorText?: string
  errorTextClassName?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      <textarea
        ref={ref}
        className={twMerge(
          'p-3 border w-full border-gray-400 rounded transition-all text-black placeholder-gray-400 outline-none !outline-1',
          'focus:outline-sky-500 focus:shadow-none focus:outline-offset-0',
          errorText
            ? 'border-red-500 focus:border-red-500 focus:outline-red-500 focus:shadow-red-500'
            : '',
          className
        )}
        {...props}
      />
      {errorText ? (
        <div className={twMerge('text-red-500 text-sm', errorTextClassName)}>
          {errorText}
        </div>
      ) : (
        <></>
      )}
      {helperText ? (
        <div className={twMerge('text-gray-600 text-sm', helperTextClassName)}>
          {helperText}
        </div>
      ) : (
        <></>
      )}
    </label>
  )
)
