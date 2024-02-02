import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import { SpinIcon } from '../icons'

export const InfiniteLoading = ({
  children,
  isFetching,
  hasNextPage,
  fetchNextPage
}: {
  children: React.ReactNode
  isFetching: boolean
  fetchNextPage: () => void
  hasNextPage?: boolean
}) => {
  const [ref, inView] = useInView()

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  return (
    <>
      {children}
      {hasNextPage && (
        <div
          ref={ref}
          className="mt-3 p-3 w-full flex items-center justify-center"
        >
          <SpinIcon className="h-10 w-10 animate-spin text-sky-500" />
        </div>
      )}
    </>
  )
}
