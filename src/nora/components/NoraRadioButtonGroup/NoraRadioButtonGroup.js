import React from 'react'
import PropTypes from 'prop-types'
import { RadioButtonGroup } from '../../../components/index'
import styles from './NoraRadioButtonGroup.module.scss'

export const NoraRadioButtonGroup = ({
  name,
  options,
  onChange,
  formChangeHandler,
  initialValue = undefined,
  currentValue,
  currentError,
  formTouched,
  disabled,
  validator,
  required,
}) => {
  return (
    <div className={styles.NoraRadioButtonGroup}>
      <RadioButtonGroup
        name={name}
        labelCopy=""
        options={options}
        onChange={onChange}
        formChangeHandler={formChangeHandler}
        initialValue={initialValue}
        currentValue={currentValue}
        currentError={currentError}
        formTouched={formTouched}
        disabled={disabled}
        validator={validator}
        required={required}
      />
    </div>
  )
}

NoraRadioButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  formChangeHandler: PropTypes.func,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  currentValue: PropTypes.string,
  currentError: PropTypes.string,
  formTouched: PropTypes.bool,
  disabled: PropTypes.bool,
  validator: PropTypes.func,
  required: PropTypes.bool,
}
