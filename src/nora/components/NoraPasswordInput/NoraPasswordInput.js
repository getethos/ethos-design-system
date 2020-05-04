import React from 'react'
import { TextInput } from '../../../components/index'
import styles from './NoraPasswordInput.module.scss'

export const NoraPasswordInput = (props) => (
  <div className={styles.NoraPasswordInput}>
    <TextInput type="password" restrictIllegal={false} {...props} />
  </div>
)
