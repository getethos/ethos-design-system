import React from 'react'
// import PropTypes from 'prop-types'

import styles from './Columns.module.scss'

export function ColumnWrapper({ children }) {
  return <div className={styles.twoColumnLayout}>{children}</div>
}
