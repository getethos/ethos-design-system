import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import useInputValidation from '../../../hooks/useInputValidation.js'
import { BaseTextAreaInput } from '../../../components/TextAreaInput/BaseTextAreaInput'
import styles from './NoraTextAreaInput.module.scss'

export const NoraTextAreaInput = ({
  disabled,
  name,
  value,
  labelCopy,
  labelClassName,
  textClassName,
  placeholder,
  onBlur,
  onFocus,
  onChange,
  ...rest
}) => {
  const {
    formChangeHandler,
    validator,
    initialValue,
    currentValue,
    currentError,
    setFieldTouched,
  } = { ...rest }

  const classes = [styles.NoraTextInput, textClassName].join(' ')

  // Set up validation hooks
  const [getError, setError, , validate] = useErrorMessage(validator)

  const [val, setVal] = useState(currentValue || initialValue || '')

  const [touched, setTouched] = useState(initialValue ? true : false)

  const [doValidation] = useInputValidation({
    validate,
    setError,
    formChangeHandler,
  })

  const handleChange = (ev) => {
    const val = ev.target.value
    setVal(val)

    // We call setTouched in onBlur, so can reliably call getter here
    doValidation(val, touched)

    if (!!onChange) onChange(ev)
  }

  const setAllTouched = () => {
    // We set touched to change the react state, but it's async and
    // processing still, so, we use a flag for doValidation
    setTouched(true)
    // Also tell the form we've been touched
    if (setFieldTouched) {
      setFieldTouched(true)
    }
  }

  // Initial Value aka prefilled—are considered "touched", but must prevalidate
  // which will in turn update the internal form state as to their validity
  useEffect(() => {
    if (!!formChangeHandler && initialValue) {
      console.log('TextAreaInput useEffect -- calling doValidation')
      doValidation(initialValue, '')
    }
  }, [])

  const handleBlur = (ev) => {
    setAllTouched()
    doValidation(ev.target.value, true)
    if (!!onBlur) onBlur(ev)
  }

  // TODO: this indicates a field level error on the NoraTextAreaInput
  if (getError(currentError, touched)) {
    console.log('NoraTextAreaInput field error: ', currentError)
  }

  return (
    <>
      {labelCopy && <label className={labelClassName}>{labelCopy}</label>}
      <BaseTextAreaInput
        className={classes}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        onBlur={handleBlur}
        onFocus={onFocus}
        onChange={handleChange}
        value={val}
        data-tid={rest['data-tid']}
      />
    </>
  )
}

NoraTextAreaInput.propTypes = {
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  labelCopy: PropTypes.string,
  labelClassName: PropTypes.string,
  textClassName: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
}
