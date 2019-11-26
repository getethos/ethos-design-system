import React from 'react'
// import PropTypes from 'prop-types'

import styles from './Columns.module.scss'

export function ColumnSmall({ children }) {
  return <div className={styles.columnSmall}>{children}</div>
}
