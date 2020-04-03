import React from 'react'
import { RadioButtonGroup } from '../../../components/index'
import styles from './NoraRadioButtonGroup.module.scss'

export const NoraRadioButtonGroup = ({ children, ...props }) => {
  return (
    <div className={styles.NoraRadioButtonGroup}>
      <RadioButtonGroup labelCopy="" {...props}>
        {children}
      </RadioButtonGroup>
    </div>
  )
}
