import * as React from 'react'
import { Portal } from '../Portal'
import styles from './Drawer.module.scss'
import { DrawerContent } from './DrawerContent'
type DrawerProps = {
  onDismiss: (...args: any[]) => any
  isOpen: boolean
  lock?: boolean
  position?: 'left' | 'right' | 'bottom' | 'top'
  className?: string
  floatingDrawerContentRenderer?: (...args: any[]) => any
  ignoredSelectors?: string[]
  'data-tid'?: string
}
/**
 * Drawer component used to progressively disclose information when toggled
 */
export const Drawer: React.FC<DrawerProps> = ({
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
