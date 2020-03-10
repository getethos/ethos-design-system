import { useLayoutEffect } from 'react'

/**
 * Hook handles a click outside the targeted component or ignored selector
 *
 * @public
 *
 * @param {React.MutableRefObject<HTMLElement | null>} ref - the component's ref
 * @param {Array} of selectors to ignore - selectors to ignore when we consider outside clicks
 * @param {() => void} handler - a callback that fires when an outside click is detected
 *
 * @return {void}
 */
function useOutsideClickIgnoreSelectors(ref, ignoredSelectors, handler) {
  const handleClickOutside = (e) => {
    let isIgnoredElement = false
    if (ignoredSelectors) {
      for (let sel of ignoredSelectors) {
        if (e.target.matches(sel)) {
          isIgnoredElement = true
        }
      }
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

export default useOutsideClickIgnoreSelectors
