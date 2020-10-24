import * as React from 'react'
import { Drawer } from '../../../components/index'
import styles from './NoraDrawer.module.scss'
type NoraDrawerProps = {
  drawerClasses?: string
  closeCopy: string
  labelCopy: string
  onDismiss: (...args: any[]) => any
  isOpen: boolean
  lock?: boolean
  position?: 'left' | 'right'
  floatingDrawerContentRenderer?: (...args: any[]) => any
  ignoredSelectors?: string[]
  'data-tid'?: string
}
/**
 * Drawer component used to progressively disclose information when toggled
 *
 * @public (or @private?)
 *
 * @param {ReactNode} children - Children to render within the drawer
 * @param {boolean} isOpen - indicates if drawer is open or not
 * @param {string} labelCopy - Copy to display in the drawer's header
 *
 * @return {JsxElement}
 */
export const NoraDrawer: React.FC<NoraDrawerProps> = ({
  children,
  isOpen,
  lock = false,
  onDismiss,
  position,
  labelCopy,
  closeCopy,
  floatingDrawerContentRenderer,
  ignoredSelectors,
  drawerClasses,
}) => {
  return (
    <Drawer
      className={[drawerClasses].join(' ')}
      onDismiss={onDismiss}
      isOpen={isOpen}
      lock={lock}
      position={position}
      ignoredSelectors={ignoredSelectors}
      floatingDrawerContentRenderer={floatingDrawerContentRenderer}
    >
      <header className={styles.Header}>
        <button onClick={() => onDismiss(false)} className={styles.Close}>
          {closeCopy}
        </button>
        {labelCopy}
      </header>
      {children}
    </Drawer>
  )
}
NoraDrawer.defaultProps = {
  drawerClasses: '',
}
