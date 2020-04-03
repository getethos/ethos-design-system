import React from 'react'
import PropTypes from 'prop-types'
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

NoraRadioButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
}
