import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { InputLabel } from '../InputLabel'
import useRequired from '../../../hooks/useRequired.js'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import useInvalid from '../../../hooks/useInvalid.js'
import restrict from '../../../helpers/restrict.js'

// TODO -- pull in errors as CSS Modules too
//import errorStyles from '../Inputs/Errors.module.scss
import styles from './TextInput.module.scss'

/* @getethos/design-system/TextInput.js

/**
 * WIP
 *
 * @param  {String}   props.name        Input name and htmlFor prop for label
 * @param  {String}   props.labelCopy   User-visible text of label for input
 * @param  {Boolean}  props.allCaps     Whether to text-trasform: uppercase
 * @param  {Function} props.validator   Function for validating input
 * @param  {Boolean}  props.disabled  
 */

function PrivateTextInput({
  disabled,
  name,
  labelCopy,
  allCaps,
  formChangeHandler,
  validator,
  ...rest
}) {
  // Verify that all required props were supplied
  const [includesRequired] = useRequired(['data-tid', 'name', 'labelCopy'])
  let allRelevantProps = Object.assign({}, rest, {
    name: name,
    labelCopy: labelCopy,
    allCaps: allCaps,
  })
  includesRequired(allRelevantProps)

  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(
    Object.keys(PrivateTextInput.PUBLIC_PROPS)
  )
  includesInvalid(rest)

  // Set up validation hooks
  const [getError, setError, validate] = useErrorMessage(validator)

  const [value, setValue] = useState('')

  const [touched, setTouched] = useState(false)

  const setErrorWrapper = (errorValue) => {
    if (!!formChangeHandler) {
      formChangeHandler(value, errorValue)
    }
    setError(errorValue)
  }

  const callErrorHandlers = (value, handlerFn) => {
    let errorMessage = validate(value)
    errorMessage = errorMessage.length ? errorMessage : ''
    handlerFn(errorMessage)
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

  const onChange = (ev) => {
    const val = event.target.value
    const restrictedVal = restrict(val)
    setValue(restrictedVal)

    // We call setTouched in onBlur, so can reliably call getter here
    doValidation(restrictedVal, touched)
  }

  const onBlur = (ev) => {
    // We set touched to change the react state, but it's async and
    // processing still, so, we use a flag for doValidation
    setTouched(true)
    doValidation(ev.target.value, true)
  }

  const onPaste = (ev) => {
    const val = ev.clipboardData.getData('text/plain')
    const restrictedVal = restrict(val)
    setValue(restrictedVal)
  }

  const getClasses = () => {
    // TODO -- use something like ${errorStyles.Error}
    return !!getError() ? `${styles.TextInput} Error` : `${styles.TextInput}`
  }

  return (
    <>
      <InputLabel name={name} labelCopy={labelCopy} />
      <input
        type="text"
        className={getClasses()}
        disabled={disabled}
        name={name}
        onPaste={onPaste}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        data-tid={rest['data-tid']}
      />
      {getError()}
    </>
  )
}

PrivateTextInput.PUBLIC_PROPS = {
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  allCaps: PropTypes.bool,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
}

PrivateTextInput.propTypes = {
  ...PrivateTextInput.PUBLIC_PROPS,
}

function TextInputFactory(privateProps) {
  const PublicTextInputComponent = (downstreamProps) => {
    return <PrivateTextInput {...downstreamProps} {...privateProps} />
  }

  return PublicTextInputComponent
}

export const TextInput = TextInputFactory()
