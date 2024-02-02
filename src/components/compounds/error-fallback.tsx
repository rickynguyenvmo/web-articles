import type { FallbackProps } from 'react-error-boundary'
import { Button } from '../atoms'
import { CloseCircleIcon } from '../icons'

export const ErrorFallback = (props: FallbackProps) => {
  return (
    <div className="bg fixed h-full w-full flex items-center justify-center bg-sky-200/5">
      <div className="px-6 py-4 w-[450px] max-w-[450px] rounded-lg bg-white shadow-lg">
        <CloseCircleIcon className="m-auto h-12 w-12 text-red-500" />
        <h1 className="mt-2 text-2xl text-center font-semibold">
          Some errors happen
        </h1>
        {props.error && (
          <div className="mt-2 text-center">{props.error.message}</div>
        )}
        <div className="mt-3">
          <Button className="m-auto" onClick={props.resetErrorBoundary}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}
