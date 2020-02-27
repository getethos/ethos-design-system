import { useLayoutEffect } from 'react'
import { codes } from '../../helpers/constants.js'

/**
 * Hook handles a escape key when using portals
 *
 * @public
 *
 * @param {React.MutableRefObject<HTMLElement | null>} ref - the component's ref
 * @param {() => void} handler - a callback that fires when Escape key pressed
 *
 * @return {void}
 */
function useOutsideEscape(ref, handler) {
  const handleEscapeOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      if (['Escape', 'esc'].includes(e.key) || e.keyCode === codes.ESCAPE) {
        handler.call(this, [e])
      }
    }
  }

  useLayoutEffect(() => {
    // Bind the event listener
    document.addEventListener('keydown', handleEscapeOutside)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', handleEscapeOutside)
    }
  }, [])
}

export default useOutsideEscape
