import * as React from 'react'
import { useRef } from 'react'
import useHideAriaSiblings from '../../hooks/a11y/useHideAriaSiblings'
import useOutsideClickIgnoreSelectors from '../../hooks/a11y/useOutsideClickIgnoreSelectors'
import useOutsideEscape from '../../hooks/a11y/useOutsideEscape'
import useTrapFocus from '../../hooks/a11y/useTrapFocus'
import styles from './Drawer.module.scss'
type DrawerContentProps = {
  onDismiss: (...args: any[]) => any
  isOpen: boolean
  lock?: boolean
  position?: 'left' | 'right' | 'bottom' | 'top'
  className?: string
  ignoredSelectors?: string[]
  'data-tid'?: string
}
export const DrawerContent: React.FC<DrawerContentProps> = ({
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
