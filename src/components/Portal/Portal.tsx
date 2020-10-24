import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
/**
 * Hooks handles the creation and tear down of the portal's root
 * element.
 *
 * @private
 *
 * @param {string} [id] - The optional id of the target container. If the `id` is not passed,
 * the target container will be a div without an `id`
 *
 * @return {HTMLElement} - The DOM node to use as the Portal target
 */
function usePortal(id) {
  const [isAttached, setIsAttached] = useState(false)
  const elRef = useRef(
    document.getElementById(id) || document.createElement('div')
  )
  useEffect(() => {
    const el = elRef.current
    setIsAttached(!!el.parentElement)
    if (!isAttached) {
      el.id = id
      document.body.appendChild(el)
      setIsAttached(true)
    }
    return () => {
      if (elRef.current.parentElement && isAttached) {
        elRef.current.parentElement.removeChild(el)
      }
    }
  }, [id, elRef, isAttached])
  return elRef.current
}
type PortalProps = {
  id?: string
}
/**
 * Dynamically create's a portal component that appends to the end of the DOM
 *
 * @public
 *
 * @param {object} props - the component's props
 * @param {string} [props.id] - The optional id of the target container. If the `id` is not passed,
 * the target container will be a div without an `id`
 *
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
export const Portal: React.SFC<PortalProps> = ({ id, children }) => {
  if (typeof document === 'undefined' || !document) {
    return null
  }
  const root = usePortal(id)
  return createPortal(children, root)
}
