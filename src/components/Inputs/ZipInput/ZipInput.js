import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import { InputLabel } from '../InputLabel'

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

  const setErrorWrapper = (cleansed, errorValue) => {
    if (!!formChangeHandler) {
      formChangeHandler(cleansed, errorValue)
    }
    setError(errorValue)
  }

  const callErrorHandlers = (value, handlerFn) => {
    let errorMessage = validate(value)
    errorMessage = errorMessage.length ? errorMessage : ''
    handlerFn(value, errorMessage)
  }

  const doValidation = (value, isTouched) => {
    // User hasn't blurred but we still need to inform form
    // engine if we're in a valid state or not
    if (!isTouched && !!formChangeHandler) {
      callErrorHandlers(value, formChangeHandler)
    } else {
      // Have blurred
      callErrorHandlers(value, setErrorWrapper)
    }
  }

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

  return (
    <>
      <InputLabel name={name} labelCopy={labelCopy} allCaps={allCaps} />
      <MaskedInput
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        data-tid={restProps['data-tid']}
        guide={true}
        onBlur={onBlur}
        onChange={onChange}
        name={props.name}
        className={
          !!getError() ? 'ZipInput TextInput Error' : 'ZipInput TextInput'
        }
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
