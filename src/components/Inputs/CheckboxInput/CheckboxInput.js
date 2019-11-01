import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { COLORS } from '../../Colors.js'
import { Body } from '../../Type/Body.js'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import useInputValidation from '../../../hooks/useInputValidation.js'
import styles from './CheckboxInput.module.scss'
import errorStyles from '../Errors.module.scss'

const Facade = ({ classes }) => {
  return (
    <svg
      className={classes}
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
Facade.propTypes = {
  classes: PropTypes.string.isRequired,
}

export const CheckboxInput = ({
  formChangeHandler,
  validator,
  children,
  name,
  initialValue,
  currentValue,
  currentError,
  formTouched,
  setFieldTouched,
  ...rest
}) => {
  const initialChecked = currentValue || initialValue || false
  const [touched, setTouched] = useState(initialValue ? true : false)
  const [isChecked, setIsChecked] = useState(initialChecked)
  const [getError, setError, , validate] = useErrorMessage(validator)
  const [doValidation] = useInputValidation({
    validate,
    setError,
    formChangeHandler,
  })

  // Initial Value aka prefilled—are considered "touched", but must prevalidate
  // which will in turn update the internal form state as to their validity
  useEffect(() => {
    if (!!formChangeHandler && initialValue) {
      console.log('CheckboxInput useEffect -- calling doValidation')
      doValidation(initialValue, true)
    }
  }, [])

  const onChange = (ev) => {
    // It feels like a checkbox isn't something you blur off of, so I'm electing to
    // call a checkbox touched when you check it
    if (!touched) setTouched(true)
    const val =
      ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    doValidation(val, touched)
    setIsChecked(val)
    if (setFieldTouched) {
      setFieldTouched(true)
    }
  }

  const onKeyPress = (ev) => {
    if (ev.key === 'Space' || ev.keyCode === 32) {
      const val =
        ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
      doValidation(!val, touched)
      setIsChecked(!val)
      if (setFieldTouched) {
        setFieldTouched(true)
      }
    }
  }

  const getFacadeClasses = () => {
    return getError(currentError, touched)
      ? `${styles.Facade} FacadeError ${errorStyles.Error}`
      : `${styles.Facade} ${styles.FacadeBorder}`
  }

  const getClasses = () => {
    return getError(currentError, touched)
      ? `${styles.CheckboxInput} ${errorStyles.Error}`
      : `${styles.CheckboxInput}`
  }

  const id = name
  const otherProps = { ...rest, id, name }

  return (
    <>
      <label htmlFor={id} className={styles.root}>
        <div className={styles.checkboxWrapper}>
          <input
            className={getClasses()}
            type="checkbox"
            onChange={onChange}
            onKeyPress={onKeyPress}
            checked={isChecked}
            {...otherProps}
          />
          <Facade classes={getFacadeClasses()} />
        </div>
        <Body.Regular400 color={COLORS.GRAY_PRIMARY}>
          {children}
        </Body.Regular400>
      </label>
      {getError(currentError, touched)}
    </>
  )
}

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired, // must be unique
  'data-tid': PropTypes.string.isRequired,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setFieldTouched: PropTypes.func,
  currentError: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  validator: PropTypes.func,
  formChangeHandler: PropTypes.func,
}
