import React from 'react'
import PropTypes from 'prop-types'
import styles from './Tag.module.scss'

export const Tag = ({ children, type }) => {
  let colorClass
  switch (type) {
    case 'approved':
      colorClass = styles.Approved
      break
    case 'rejected':
      colorClass = styles.Rejected
      break
    default:
      colorClass = styles.Default
  }

  return <div className={[styles.Tag, colorClass].join(' ')}>{children}</div>
}

Tag.propTypes = {
  type: PropTypes.oneOf(['approved', 'rejected']),
  children: PropTypes.string.isRequired,
}

Tag.defaultProps = {
  type: undefined,
}
