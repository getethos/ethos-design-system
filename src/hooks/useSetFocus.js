import { useState, useLayoutEffect } from 'react'

/**
 * Hook sets focus on the passed ref. Will pass focus to the previously focused
 * element when the component is unmounted
 *
 * @public
 *
 * @param {React.MutableRefObject<HTMLElement | null>} ref - the coponent's ref
 * @param {boolean} isFocusReady - if true, the ref can be focused
 *
 * @return {boolean} - a boolean that represents if the component is currently focused
 */
function useSetFocus(ref, isFocusReady) {
  const [isFocused, setIsFocused] = useState(false)

  useLayoutEffect(() => {
    const prevEl = document.activeElement

    if (isFocusReady) {
      ref.current.focus()
      setIsFocused(true)
    }

    return () => {
      prevEl.focus()
      setIsFocused(false)
    }
  }, [isFocusReady])

  return isFocused
}

export default useSetFocus
