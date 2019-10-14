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
    ...restProps
  } = props

  const [getError, setError, validate] = useErrorMessage(validator)
  const [touched, setTouched] = useState(false)

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

  const [doValidation] = useInputValidation({validate, setError, formChangeHandler, callErrorHandlers})

  const onBlur = (ev) => {
    // We set touched to change the react state, but it's async and
    // processing still, so, we use a flag for doValidation
    setTouched(true)
    doValidation(ev.target.value, true)
  }

  const onChange = (ev) => {
    // We call setTouched in onBlur, so can reliably call getter here
    doValidation(ev.target.value, touched)
  }


  const getClasses = () => {
    return !!getError() ?
      `ZipInput ${styles.TextInput} ${errorStyles.Error}` :
      `ZipInput ${styles.TextInput}`
  }

  return (
    <>
      <TextMaskedInput
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
        type="tel"
        labelCopy={labelCopy}
        allCaps={allCaps}
        data-tid={restProps['data-tid']}
        guide={true}
        onBlur={onBlur}
        onChange={onChange}
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
