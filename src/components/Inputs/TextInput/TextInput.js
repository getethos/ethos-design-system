import React, { useState } from 'react'
import PropTypes from 'prop-types'

import useRequired from '../../../hooks/useRequired.js'
import useMinMaxLength from '../../../hooks/useMinMaxLength.js'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import useInvalid from '../../../hooks/useInvalid.js'
import restrict from '../../../helpers/restrict.js'
import { Caption, COLORS, Spacer } from '../../index'

/* @getethos/design-system/TextInput.js

/**
 * WIP
 *
 * @param  {String}   props.name        Input name and htmlFor prop for label
 * @param  {String}   props.labelCopy   User-visible text of label for input
 * @param  {Number}   props.minLength   Min number of characters allowed
 * @param  {Number}   props.maxLength   Max number of characters allowed 
 * @param  {Boolean}  props.allCaps     Whether to text-trasform: uppercase
 * @param  {Function} props.validator   Function for validating input
 * @param  {Boolean}  props.disabled  
 */

// Riffing off redux-form a bit: "this will be set when the field is blurred"
let touched = false

function PrivateTextInput({
  disabled,
  name,
  minLength = 0,
  maxLength = Number.MAX_SAFE_INTEGER,
  labelCopy,
  allCaps,
  validator,
  ...rest
}) {
  // Verify that all required props were supplied
  const [includesRequired] = useRequired(['data-tid', 'name', 'labelCopy'])
  let allRelevantProps = Object.assign({}, rest, {
    name: name,
    minLength: minLength,
    maxLength: maxLength,
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
  const [minMaxValidator] = useMinMaxLength(minLength, maxLength)

  const [value, setValue] = useState('')

  const doValidation = (value) => {
    const minMaxError = minMaxValidator(value)
    if (minMaxError) {
      setError(minMaxError)
      return
    }
    const errMsg = validate(value)
    if (errMsg.length) {
      setError(errMsg)
    } else {
      setError('')
    }
  }

  const onBlur = (ev) => {
    touched = true
    doValidation(ev.target.value)
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
      <Caption.Medium500 element="label" allCaps={allCaps} htmlFor={name}>
        {labelCopy}
      </Caption.Medium500>
      <Spacer.H8 />
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
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
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
