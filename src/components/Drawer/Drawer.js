import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Portal } from '../Portal'
import useOutsideClick from '../../hooks/a11y/useOutsideClick'
import useOutsideEscape from '../../hooks/a11y/useOutsideEscape'
import useHideAriaSiblings from '../../hooks/a11y/useHideAriaSiblings'
import useTrapFocus from '../../hooks/a11y/useTrapFocus'
import styles from './Drawer.module.scss'

const DrawerContent = ({
  children,
  onDismiss,
  isOpen,
  position,
  className,
  ...rest
}) => {
  const drawerRef = useRef(null)

  const positionClass = position == 'left' ? styles.Left : styles.Right
  let classes = isOpen
    ? `${styles.Container} ${styles.Open} ${positionClass}`
    : `${styles.Container} ${positionClass}`

  classes = className ? `${className} ${classes}` : classes

  useOutsideClick(drawerRef, () => onDismiss(false))
  useOutsideEscape(drawerRef, () => onDismiss(false))
  useTrapFocus(drawerRef, isOpen)
  useHideAriaSiblings(drawerRef, isOpen)

  return (
    <div
      className={classes}
      aria-label="drawer"
      role="dialog"
      aria-hidden={!isOpen}
      ref={drawerRef}
      data-testid={rest['data-tid']}
    >
      {children}
    </div>
  )
}

DrawerContent.propTypes = {
  children: PropTypes.node.isRequired,
  onDismiss: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  'data-tid': PropTypes.string,
}

/**
 * Drawer component used to progressively disclose information when toggled
 */
export const Drawer = ({
  children,
  onDismiss,
  isOpen,
  position,
  floatingDrawerContentRenderer,
  className,
  ...rest
}) => {
  // We need this so we can track key down events esp the ESC key
  const overlayClasses = isOpen
    ? styles.DrawerWrapperActive
    : styles.DrawerWrapper

  return (
    <Portal id="drawer-root">
      <div
        className={overlayClasses}
        aria-hidden={!isOpen}
        data-testid="base-drawer-container"
      >
        <DrawerContent
          onDismiss={onDismiss}
          isOpen={isOpen}
          position={position}
          className={className}
          {...rest}
        >
          {children}
        </DrawerContent>
        {floatingDrawerContentRenderer && floatingDrawerContentRenderer()}
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
  /** optional renderer for rendering floating items e.g. a floating action button */
  floatingDrawerContentRenderer: PropTypes.func,
  /** data attribute for testing */
  'data-tid': PropTypes.string,
}
