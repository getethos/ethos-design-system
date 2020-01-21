import { useState, useEffect } from 'react'

const FOCUSABLE_ELEMENTS_STRING =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'

/**
 * Helper function returns a list of focusable children of the passed element
 *
 * @param {HTMLElement} el - the container element
 */
function getFocusableElements(el) {
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

        return setFocusedElemIdx(idx)
      }
    }
  }

  useEffect(() => {
    const prevFocusedEl = document.activeElement
    const elements = getFocusableElements(ref.current)
    const handler = handleTrapTab(elements.length - 1)

    // Setup the event listener
    if (isActive && elements.length > 0) {
      ref.current.addEventListener('keydown', handler)
      elements[focusedElemIdx].focus()
    }

    return () => {
      // Reset focus to the last item previous to the trap being activated
      prevFocusedEl.focus()
      ref.current.removeEventListener('keydown', handler)
    }
  }, [focusedElemIdx, isActive])
}

export default useTrapFocus
