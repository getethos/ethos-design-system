import React from 'react'
// import PropTypes from 'prop-types'

import styles from './Columns.module.scss'

function ColumnSmall({ children }) {
  return (
    <div className={styles.columnWrapper}>
      <div className={styles.columnSmall}>{children}</div>
    </div>
  )
}

function ColumnMedium({ children, alignRight }) {
  const classNames = [styles.columnMedium]
  if (alignRight) {
    classNames.push(styles.alignRight)
  }
  return (
    <div className={styles.columnWrapper}>
      <div className={classNames.join(' ')}>{children}</div>
    </div>
  )
}

function ColumnLarge({ children }) {
  return (
    <div className={styles.columnWrapper}>
      <div className={styles.columnLarge}>{children}</div>
    </div>
  )
}

const Column = {
  Small: ColumnSmall,
  Medium: ColumnMedium,
  Large: ColumnLarge,
}

export default Column
