import { useLayoutEffect } from 'react'

export const LOCK_SCROLL_STYLES = (scrollPosition) =>
  `overflow: hidden; position: fixed; width: 100%; top: ${-scrollPosition}px;`

/**
 * Hook set's scroll lock on the body element
 *
 * @param {boolean} setBodyOverflow - flag set's if the body is currently scroll locked
 *
 * @return {void}
 */
function useBodyScrollLock(setBodyOverflow) {
  useLayoutEffect(() => {
    const [body] = document.getElementsByTagName('body')
    const scrollPos = window.scrollY

    if (setBodyOverflow) {
      body.setAttribute('style', LOCK_SCROLL_STYLES(scrollPos))
    }

    return () => {
      const scrollY = body.style.top
      body.setAttribute('style', '')

      // Reset's the scroll position to the previous position when
      // `position: fixed` and `top` is removed from the body
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }, [setBodyOverflow])
}

export default useBodyScrollLock
