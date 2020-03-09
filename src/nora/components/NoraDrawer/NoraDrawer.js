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
  onDismiss,
  position,
  centerCopy,
  leftCopy,
  leftClassName,
  leftOnClick
}) => {
  return (
    <Drawer
      className={styles.NoraDrawer}
      onDismiss={onDismiss}
      isOpen={isOpen}
      position={position}
    >
      <header className={styles.Header}>
        <button onClick={() => onDismiss(false)} className={leftClassName}>
          {leftCopy}
        </button>
        {centerCopy}
      </header>
      {children}
    </Drawer>
  )
}

NoraDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  // TODO: top / bottom
  position: PropTypes.oneOf(['left', 'right']),
  onDismiss: PropTypes.func.isRequired,
  centerCopy: PropTypes.string.isRequired,
  leftCopy: PropTypes.string.isRequired,
  leftClassName: PropTypes.string,
  leftOnClick: PropTypes.func,
}
