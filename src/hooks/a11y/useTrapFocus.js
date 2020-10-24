import { useState, useLayoutEffect } from 'react'

// Ref: https://github.com/angular-ui/bootstrap/blob/834975899b734369465c2737c4fc947a257c4b1c/src/modal/modal.js#L272
const FOCUSABLE_ELEMENTS_STRING =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], [contenteditable=true]'

/**
 * Helper function returns a list of focusable children of the passed element
 *
 * @param {HTMLElement | null} el - the container element
 */
export const getFocusableElements = (el) => {
  if (!el) {
    return []
  }

  const focusableElements = el.querySelectorAll(FOCUSABLE_ELEMENTS_STRING)

  return Array.prototype.slice.call(focusableElements)
}

/**
 * Hook will trap focus within a component
 *
 * @param {React.MutableRefObject<HTMLElement | null>} ref - the component's ref
 * @param {boolean} isActive - if true, the focus trap will be activated
 *
 * @return {void}
 */
function useTrapFocus(ref, isActive) {
  const [focusedElemIdx, setFocusedElemIdx] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)

  /**
   * Handler for tab/shift+tab key presses and increments or
   * decrements the `focusedElemIdx`.
   *
   * @param {number} lastIndex - the lastIndex that can be selected in the `elements`
   * array
   *
   * @return {(e: KeyboardEvent) => void}
   */
  const handleTrapTab = (lastIndex) => {
    return (e) => {
      if (e.key === 'Tab' || e.keyCode === 9) {
        e.preventDefault()

        // if the index is the last elem of the focusableElems, focus on the first elem,
        // otherwise, increment the index
        let idx = focusedElemIdx === lastIndex ? 0 : focusedElemIdx + 1

        // if the index is 0 and the shift+tab is hit – focus on the last elem,
        // otherwise, decrement the index
        if (e.shiftKey) {
          idx = focusedElemIdx < 1 ? lastIndex : focusedElemIdx - 1
        }

        setIsUpdating(true)
        return setFocusedElemIdx(idx)
      }
    }
  }

  useLayoutEffect(() => {
    const prevFocusedEl = document.activeElement
    const elements = getFocusableElements(ref.current)
    const handler = handleTrapTab(elements.length - 1)

    // Setup the event listener
    if (isActive && elements.length > 0) {
      elements[focusedElemIdx].focus()
      document.body.addEventListener('keydown', handler)
      setIsUpdating(false)
    }

    return () => {
      // Reset focus to the last item previous to the trap being activated
      prevFocusedEl.focus()
      document.body.removeEventListener('keydown', handler)
    }
  }, [focusedElemIdx, isActive, isUpdating])
}

export default useTrapFocus
