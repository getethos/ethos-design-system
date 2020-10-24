import * as React from 'react'
import { KabobIcon } from './KabobIcon'
import styles from './KabobMenu.module.scss'
type KabobMenuProps = {
  focusRef?: React.Ref<any>
  tabIndex?: number
  onClick?: (...args: any[]) => any
  onKeyDown: (...args: any[]) => any
}
export const KabobMenu: React.FC<KabobMenuProps> = ({
  focusRef,
  tabIndex,
  onClick,
  onKeyDown,
  children,
}) => {
  const tabIndexResolved = tabIndex ? tabIndex : undefined // ethan - why is 0 ignored?
  const focusRefResolved = focusRef ? focusRef : undefined
  return (
    <>
      <button
        ref={focusRefResolved}
        tabIndex={tabIndexResolved}
        className={styles.Box}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <KabobIcon />
      </button>
      {children}
    </>
  )
}
