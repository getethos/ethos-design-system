import React from 'react'
import { RadioButtonGroup } from '../../../components/index'
import styles from './NoraRadioButtonGroup.module.scss'

export const NoraRadioButtonGroup = ({ name, options, onChange }) => {
  return (
    <div className={styles.NoraRadioButtonGroup}>
      <RadioButtonGroup
        name={name}
        labelCopy=""
        options={options}
        onChange={onChange}
      />
    </div>
  )
}
