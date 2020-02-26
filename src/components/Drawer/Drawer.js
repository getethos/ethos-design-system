import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Portal } from '../Portal'
import useOutsideClick from '../../hooks/a11y/useOutsideClick'
import styles from './Drawer.module.scss'

/**
 * Drawer component used to progressively disclose information when toggled
 *
 * @public (or @private?)
 *
 * @param {ReactNode} children - Children to render within the drawer
 * @param {boolean} isOpen - indicates if drawer is open or not
 *
 * @return {JsxElement}
 */
export const Drawer = ({
  children,
  onDismiss,
  isOpen,
  position,
  className,
}) => {
  const drawerRef = useRef(null)

  useOutsideClick(drawerRef, () => onDismiss(false))

  const positionClass = position == 'left' ? styles.Left : styles.Right
  let classes = isOpen
    ? `${styles.Container} ${styles.Open} ${positionClass}`
    : `${styles.Container} ${positionClass}`

  classes = className ? `${className} ${classes}` : classes

  /**
   * Handler will set the the drawer's onDismiss to `false` when the escape
   * key is pressed
   *
   * @private
   *
   * @param {KeyboardEvent} e - the keyboard event
   *
   * @return {void}
   */
  const handleKeyDown = (e) => {
    console.log('yo yo yo')
    if (['Escape', 'esc'].includes(e.key) || e.keyCode === 27) {
      onDismiss(false)
    }
  }

  return (
    <Portal id="drawer-root">
      <div
        className={classes}
        aria-label="drawer"
        role="dialog"
        aria-hidden={!isOpen}
        ref={drawerRef}
      >
        {children}
      </div>
    </Portal>
  )
}

Drawer.propTypes = {
  /** The Drawer's children */
  children: PropTypes.node.isRequired,
  /** handler that onDismiss's the state of the modal */
  onDismiss: PropTypes.func.isRequired,
  /** Boolean that sets the state of the drawer */
  isOpen: PropTypes.bool.isRequired,
  // TODO: top / bottom
  /** drawer should come from left or right */
  position: PropTypes.oneOf(['left', 'right']),
  /** additional css classes */
  className: PropTypes.string,
}
