import { useLayoutEffect, useState } from 'react'

/**
 * Walks up the tree and finds the root parent element just beneath the `body` node.
 * Returns the root node
 *
 * @private
 *
 * @param {HTMLElement} elem - the element with the parent to be checked
 *
 * @return {HTMLElement}
 */
function getRootParent(elem) {
  const parent = elem.parentElement
  if (!parent || parent === document.body) {
    return elem
  }

  return getRootParent(parent)
}

/**
 * Hook set's all nodes directly below the body, that are not the `refs` parent tree,
 * to aria-hidden
 *
 * @param {React.MutableRefObject<HTMLElement | null>} ref - the component's ref
 * @param {boolean} isActive - if true, the element's siblings will be hidden
 *
 * @return {boolean}
 */
function useAriaHideSiblings(ref, isActive) {
  const [elementsHidden, setElementsHidden] = useState(false)

  useLayoutEffect(() => {
    const rootParent = getRootParent(ref.current.parentElement)

    const elems = [...document.body.children].filter((e) => e !== rootParent)

    if (isActive) {
      for (let elem of elems) {
        const prevAriaHidden = elem.getAttribute('aria-hidden')

        if (prevAriaHidden !== null) {
          elem.setAttribute('data-prev-aria-hidden', prevAriaHidden)
        }

        elem.setAttribute('aria-hidden', true)
      }

      setElementsHidden(true)
    }

    return () => {
      for (let elem of elems) {
        const prevAriaHidden = elem.getAttribute('data-prev-aria-hidden')

        if (prevAriaHidden) {
          elem.setAttribute('aria-hidden', prevAriaHidden)
        } else {
          elem.removeAttribute('aria-hidden')
        }
      }

      setElementsHidden(false)
    }
  }, [isActive])

  return elementsHidden
}

export default useAriaHideSiblings
