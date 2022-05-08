import { useEffect, useMemo, useRef, useState } from 'react'

export const useSuspense = (...loadings: boolean[]): void => {
  const isReady = useRef(true)
  const [, setReRender] = useState<number>(0)
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

  const isLoading = loadings.some(Boolean)

  useEffect(() => {
    isReady.current = !isLoading
    setReRender(x => x + 1)
  }, [isLoading])

  if (!isReady.current && loadings.some(Boolean)) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw promise
  }
}
