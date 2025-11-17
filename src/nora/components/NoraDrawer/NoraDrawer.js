import React from 'react'
import PropTypes from 'prop-types'
import { Drawer } from '../../../components/index'
import styles from './NoraDrawer.module.scss'

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
export const NoraDrawer = ({
  children,
  isOpen,
  lock = false,
  onDismiss,
  position,
  labelCopy,
  closeCopy,
  floatingDrawerContentRenderer,
  ignoredSelectors,
  drawerClasses = '',
}) => {
  return (
    <Drawer
      className={[drawerClasses, styles.Drawer].join(' ')}
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

NoraDrawer.propTypes = {
  /** override classes for the drawer */
  drawerClasses: PropTypes.string,
  /** close copy to display */
  closeCopy: PropTypes.string.isRequired,
  /** label copy to display */
  labelCopy: PropTypes.string.isRequired,
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
  /** drawer should come from left or right */
  position: PropTypes.oneOf(['left', 'right']),
  /** optional renderer for rendering floating items e.g. a floating action button */
  floatingDrawerContentRenderer: PropTypes.func,
  /** selector for floating button to be rendered so we don't consider it an "outside click" */
  ignoredSelectors: PropTypes.arrayOf(PropTypes.string),
  /** data attribute for testing */
  'data-tid': PropTypes.string,
}
