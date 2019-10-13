import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextMaskedInput } from '../TextMaskedInput'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import useInputValidation from '../../../hooks/useInputValidation.js'
import { InputLabel } from '../InputLabel'
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
    ...restProps
  } = props

  const [getError, setError, validate] = useErrorMessage(validator)
  const [touched, setTouched] = useState(initialValue ? true : false)
  const [value, setValue] = useState(initialValue || '')

  // This has to come before useInputValidation setup below
  const callErrorHandlers = (value, handlerFn) => {
    console.log("callErrorHandlers called")
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

  const [doValidation] = useInputValidation({validate, setError, formChangeHandler, callErrorHandlers})

  const getClasses = () => {
    return !!getError() ?
      `ZipInput ${styles.TextInput} ${errorStyles.Error}` :
      `ZipInput ${styles.TextInput}`
  }

  return (
    <>
      <TextMaskedInput
        initialValue={value}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
        type="tel"
        labelCopy={labelCopy}
        allCaps={allCaps}
        data-tid={restProps['data-tid']}
        guide={true}
        doValidation={doValidation}
        name={props.name}
        className={getClasses()}
        keepCharPositions={true}
      />
      {getError()}
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
}

ZipInput.propTypes = {
  ...ZipInput.PUBLIC_PROPS,
}
