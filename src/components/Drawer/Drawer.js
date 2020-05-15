import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Portal } from '../Portal'
import useOutsideClickIgnoreSelectors from '../../hooks/a11y/useOutsideClickIgnoreSelectors'
import useOutsideEscape from '../../hooks/a11y/useOutsideEscape'
import useHideAriaSiblings from '../../hooks/a11y/useHideAriaSiblings'
import useTrapFocus from '../../hooks/a11y/useTrapFocus'
import styles from './Drawer.module.scss'

const DrawerContent = ({
  children,
  onDismiss,
  isOpen,
  lock,
  position,
  className,
  ignoredSelectors,
  ...rest
}) => {
  const drawerRef = useRef(null)
  let positionClass = ''
  console.log('position test...')
  switch (position) {
    case 'left':
      positionClass = styles.Left
      break
    case 'right':
      positionClass = styles.Right
      break
    case 'top':
      positionClass = styles.Top
      break
    case 'bottom':
      positionClass = styles.Bottom
      break
  }
  let classes = isOpen
    ? `${styles.Container} ${styles.Open} ${positionClass}`
    : `${styles.Container} ${positionClass}`

  classes = className ? `${className} ${classes}` : classes

  if (!lock) {
    useOutsideClickIgnoreSelectors(drawerRef, ignoredSelectors, () =>
      onDismiss(false)
    )
    useOutsideEscape(drawerRef, () => onDismiss(false))
  }

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
  lock: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
  className: PropTypes.string,
  ignoredSelectors: PropTypes.arrayOf(PropTypes.string),
  'data-tid': PropTypes.string,
}

/**
 * Drawer component used to progressively disclose information when toggled
 */
export const Drawer = ({
  children,
  onDismiss,
  isOpen,
  lock = false,
  position,
  ignoredSelectors,
  floatingDrawerContentRenderer,
  className,
  ...rest
}) => {
  // We need this so we can track key down events esp the ESC key
  const defaultOverlayClasses = isOpen
    ? styles.DrawerWrapperActive
    : styles.DrawerWrapper

  const overlayClasses = lock
    ? [defaultOverlayClasses, styles.DrawerWrapperLocked].join(' ')
    : defaultOverlayClasses

  return (
    <Portal id="drawer-root">
      <div
        className={overlayClasses}
        aria-hidden={!isOpen}
        data-testid="base-drawer-container"
      >
        <DrawerContent
          lock={lock}
          onDismiss={onDismiss}
          isOpen={isOpen}
          position={position}
          className={className}
          ignoredSelectors={ignoredSelectors}
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
  /** Boolean that allows consumer to opt out of the default behavior which is to dismiss
   * the drawer if you click outside or escape */
  lock: PropTypes.bool,
  // TODO: top / bottom
  /** drawer should come from left, right, top, or bottom */
  position: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
  /** additional css classes */
  className: PropTypes.string,
  /** optional renderer for rendering floating items e.g. a floating action button */
  floatingDrawerContentRenderer: PropTypes.func,
  /** selector for floating button to be rendered so we don't consider it an "outside click" */
  ignoredSelectors: PropTypes.arrayOf(PropTypes.string),
  /** data attribute for testing */
  'data-tid': PropTypes.string,
}
