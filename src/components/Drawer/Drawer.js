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
 *
 * @return {JsxElement}
 */
export const Drawer = ({ children, isOpen, position, className }) => {
  const positionClass = position == 'left' ? styles.Left : styles.Right
  let classes = isOpen
    ? `${styles.Container} ${styles.Open} ${positionClass}`
    : `${styles.Container} ${positionClass}`

  classes = className ? `${className} ${classes}` : classes
  return <div className={classes}>{children}</div>
}

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  // TODO: top / bottom
  position: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
}
