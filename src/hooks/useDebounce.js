import { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'

/**
 * Custom hook to debounce a function for a specified amount of time
 */
const useDebounce = (fn, debounceDurationMs) => {
  const [isDebounced, setIsDebounced] = useState(false)

  useEffect(() => {
    let timer
    if (isDebounced) {
      timer = setTimeout(() => {
        setIsDebounced(false)
      }, debounceDurationMs)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isDebounced])

  let debouncedFn = useCallback(
    typeof fn === 'function' && debounceDurationMs > 0
      ? debounce(
          (e) => {
            fn(e)
            setIsDebounced(true)
          },
          debounceDurationMs,
          {
            leading: true,
            trailing: false,
          }
        )
      : fn,
    [fn, debounceDurationMs]
  )

  return [isDebounced, debouncedFn]
}

export default useDebounce
