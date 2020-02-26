import React from 'react'
import PropTypes from 'prop-types'
import styles from './Drawer.module.scss'

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
export const Drawer = ({
  children,
  isOpen,
  position,
  labelCopy,
  closeCopy,
}) => {
  const positionClass = position == 'left' ? styles.Left : styles.Right
  const classes = isOpen
    ? `${styles.Container} ${styles.Open} ${positionClass}`
    : `${styles.Container} ${positionClass}`
  return (
    <div className={classes}>
      <header className={styles.Header}>
        <button className={styles.Close}>{closeCopy}</button>
        {labelCopy}
      </header>
      {children}
    </div>
  )
}

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  // TODO: top / bottom
  position: PropTypes.oneOf(['left', 'right']),
}
