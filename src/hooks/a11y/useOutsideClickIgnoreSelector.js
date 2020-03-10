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
function useOutsideClickIgnoreSelector(ref, ignoreSelector, handler) {
  const handleClickOutside = (e) => {
    let isIgnoredElement = false
    if (e.target.classList && e.target.classList.contains(ignoreSelector)) {
      isIgnoredElement = true
    }
    if (!isIgnoredElement && ref.current && !ref.current.contains(e.target)) {
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

export default useOutsideClickIgnoreSelector
