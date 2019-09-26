import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { InputLabel } from '../InputLabel'
import useRequired from '../../../hooks/useRequired.js'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import useInvalid from '../../../hooks/useInvalid.js'
import restrict from '../../../helpers/restrict.js'

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

// Riffing off redux-form a bit: "this will be set when the field is blurred"
let touched = false

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

  const setErrorWrapper = (errorValue) => {
    if (!!formChangeHandler) {
      formChangeHandler(value, errorValue)
    }
    setError(errorValue)
  }

  const doValidation = (value) => {
    const errMsg = validate(value)
    if (errMsg.length) {
      setErrorWrapper(errMsg)
    } else {
      setErrorWrapper('')
    }
  }

  const onBlur = (ev) => {
    touched = true
    doValidation(value)
  }

  const onChange = (ev) => {
    const val = event.target.value
    const restrictedVal = restrict(val)
    setValue(restrictedVal)
    if (!touched) {
      return
    }
    doValidation(restrictedVal)
  }

  const onPaste = (ev) => {
    const val = ev.clipboardData.getData('text/plain')
    const restrictedVal = restrict(val)
    setValue(restrictedVal)
  }

  return (
    <>
      <InputLabel name={name} labelCopy={labelCopy} />
      <input
        type="text"
        className={!!getError() ? 'TextInput Error' : 'TextInput'}
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
