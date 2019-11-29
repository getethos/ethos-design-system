import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TextMaskedInput } from '../TextMaskedInput'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import useInputValidation from '../../../hooks/useInputValidation.js'
import zipInputValidator from '../../../validators/ZipInputValidator'
import styles from '../TextInput/TextInput.module.scss'
import errorStyles from '../Errors.module.scss'

export const ZipInput = (props) => {
  const {
    name,
    labelCopy,
    allCaps,
    validator,
    formChangeHandler,
    initialValue,
    currentValue,
    currentError,
    formTouched,
    ...restProps
  } = props

  const [getError, setError, , validate] = useErrorMessage(validator)
  const val = currentValue || initialValue
  const [touched, setTouched] = useState(initialValue ? true : false)
  const [value] = useState(val || '')

  // This has to come before useInputValidation setup below
  const callErrorHandlers = (value, handlerFn) => {
    /// Check zip format validity
    let errMsg = zipInputValidator(value)
    const errorMessage = errMsg.length ? errMsg : ''
    if (errorMessage.length) {
      handlerFn(value, errorMessage)
    } else {
      // Call any addtional validators the consumer has setup
      // Note if no validators, we're still safe as validate checks
      let errorMessage = validate(value)
      errorMessage = errorMessage.length ? errorMessage : ''
      handlerFn(value, errorMessage)
    }
  }

  useEffect(() => {
    if (!!formChangeHandler && initialValue) {
      console.log('ZipInput useEffect -- calling doValidation')
      formChangeHandler(initialValue, '')
    }
  }, [])

  const [doValidation] = useInputValidation({
    validate,
    setError,
    formChangeHandler,
    callErrorHandlers,
  })

  const getClasses = () => {
    return getError(currentError, touched)
      ? `ZipInput ${styles.TextInput} ${errorStyles.Error}`
      : `ZipInput ${styles.TextInput}`
  }

  return (
    <>
      <TextMaskedInput
        initialValue={value}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
        pipe={props.pipe}
        placeholder={props.placeholder}
        type="tel"
        labelCopy={labelCopy}
        allCaps={allCaps}
        data-tid={restProps['data-tid']}
        guide={true}
        doValidation={doValidation}
        name={name}
        className={getClasses()}
        keepCharPositions={true}
        currentValue={currentValue}
        currentError={currentError}
        formTouched={formTouched}
        setFieldTouched={restProps.setFieldTouched}
        getTouched={touched}
        setTouched={setTouched}
      />
      {getError(currentError, touched)}
    </>
  )
}

ZipInput.PUBLIC_PROPS = {
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  initialValue: PropTypes.string,
}

ZipInput.propTypes = {
  ...ZipInput.PUBLIC_PROPS,
}
