import { useLayoutEffect } from 'react'

/**
 * Hook handles a click outside the targeted component
 *
 * @public
 *
 * @param {React.MutableRefObject<HTMLElement | null>} ref - the component's ref
 * @param {() => void} handler - a callback that fires when an outside click is detected
 *
 * @return {void}
 */
function useOutsideClick(ref, handler) {
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      handler.call(this, [e])
    }
  }

  useLayoutEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])
}

export default useOutsideClick
