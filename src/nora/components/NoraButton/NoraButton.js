import React from 'react'
import PropTypes from 'prop-types'
import styles from './NoraButton.module.scss'

export const NoraButton = ({ className, children }) => {
  return (
    <button className={[styles.Button, className].join(' ')}>{children}</button>
  )
}

NoraButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
}
