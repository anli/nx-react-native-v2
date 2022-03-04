/* istanbul ignore file */
import { useEffect, useMemo, useRef } from 'react'

export const Suspender = (): JSX.Element => {
  const resolve = useRef<() => void>()
  const promise = useMemo(
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    () =>
      // eslint-disable-next-line promise/param-names
      new Promise<void>((res) => {
        resolve.current = res
      }),
    []
  )

  useEffect(() => {
    return () => {
      resolve.current?.()
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw promise
}
