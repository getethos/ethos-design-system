import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

/**
 * Hooks handles the creation and tear down of the portal's root
 * element.
 *
 * @private
 *
 * @param {String} id - The id of the target container
 *
 * @return {HTMLElement} - The DOM node to use as the Portal target
 */
function usePortal(id) {
  const [isAttached, setIsAttached] = useState(false)
  const el = useRef(
    document.getElementById(id) || document.createElement('div')
  )

  useEffect(() => {
    setIsAttached(!!el.current.parentElement)

    if (!isAttached) {
      el.current.id = id
      document.body.appendChild(el.current)
      setIsAttached(true)
    }

    return () => {
      if (isAttached) {
        el.current.parentElement.removeChild(el.current)
      }
    }
  }, [id, el, isAttached])

  return el.current
}

/**
 * Dynamically create's a portal component that appends to the end of the DOM
 *
 * @public
 *
 * @param {object} props - the component's props
 * @param {string} props.id - the portal root element's id
 * @param {React.children} props.children - the children element
 *
 * @example ```
 * <Portal id="glados">
 *   <h1>This was a triumph</h1>
 * </Portal>
 * ```
 *
 * @return {React.ReactPortal}
 */
export const Portal = ({ id, children }) => {
  const root = usePortal(id)

  return createPortal(children, root)
}

Portal.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
}
