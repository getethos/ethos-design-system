import React from 'react'
// import PropTypes from 'prop-types'

import styles from './Columns.module.scss'

export default function ColumnWrapper({ children, divider }) {
  if (React.Children.count(children) !== 2) {
    throw new Error('ColumnWrapper can only be used with exactly two columns.')
  }

  const classNames = [styles.twoColumnLayout]
  if (divider) {
    classNames.push(styles.dividerLine)
  }
  return <div className={classNames.join(' ')}>{children}</div>
}
