import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Body } from '../../Type/Body.js'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import useInputValidation from '../../../hooks/useInputValidation.js'
import styles from './CheckboxInput.module.scss'
import errorStyles from '../Errors.module.scss'

const Facade = () => {
  return (
    <svg
      className={styles.Facade}
      width="18"
      height="18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.75 12.127L3.623 9l-1.065 1.057L6.75 14.25l9-9-1.057-1.058-7.943 7.935z"
        fill="#fff"
      />
    </svg>
  )
}

export const CheckboxInput = ({
  formChangeHandler,
  validator,
  children,
  optional,
  name,
  initialValue,
  currentValue,
  currentError,
  formTouched,
  ...rest
}) => {

  const initialChecked = currentValue || initialValue || false 
  const [touched, setTouched] = useState(initialChecked)
  const [isChecked, setIsChecked] = useState(initialChecked)
  const [getError, setError, getFormattedError, validate] = useErrorMessage(validator)
  const [doValidation] = useInputValidation({validate, setError, formChangeHandler})

  const onChange = (ev) => {
    // It feels like a checkbox isn't something you blur off of, so I'm electing to 
    // call a checkbox touched when you check it
    if (!touched) setTouched(true)
    const val = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    doValidation(val, touched)
    setIsChecked(val)
  }

  const onKeyPress = (ev) => {
    if (ev.key === 'Space' || ev.keyCode === 32) {
      const val = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
      doValidation(!val, touched)
      setIsChecked(!val)
    }
  }

  const getClasses = () => {
    return !!getError(currentError, touched) ? `${styles.CheckboxInput} ${errorStyles.Error}` : `${styles.CheckboxInput}`
  }

  const id = name
  const otherProps = { ...rest, id, name }

  return (
    <>
      <label htmlFor={id} className={styles.root}>
        <div className={styles.checkboxWrapper}>
          <input
            className={styles.CheckboxInput}
            type="checkbox"
            onChange={onChange}
            onKeyPress={onKeyPress}
            checked={isChecked}
            {...otherProps}
          />
          <Facade />
        </div>
        <Body.Regular400>{children}</Body.Regular400>
      </label>
      {getError(currentError, formTouched)}
    </>
  )
}

CheckboxInput.propTypes = {
  optional: PropTypes.bool,
  name: PropTypes.string.isRequired, // must be unique
  'data-tid': PropTypes.string.isRequired,
  initialValue: PropTypes.bool,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  validator: PropTypes.func,
  formChangeHandler: PropTypes.func,
}
