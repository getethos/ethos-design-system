import React from 'react'
import PropTypes from 'prop-types'
import useRequired from '../../../hooks/useRequired.js'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import useInvalid from '../../../hooks/useInvalid.js'

import { Body, COLORS } from '../../index'

/* @getethos/design-system/TextInput.js

/**
 * WIP
 *
 * @param  {String}   props.name        Input name and htmlFor prop for label
 * @param  {String}   props.labelCopy   User-visible text of label for input
 * @param  {Function} props.validator   Function for validating input
 * @param  {Boolean}  props.disabled  
 */

// Riffing off redux-form a bit: "this will be set when the field is blurred"
let touched = false;

function PrivateTextInput({ disabled, name, labelCopy, validator, ...rest }) {
  // Verify that all required props were supplied
  const [includesRequired] = useRequired(['data-tid', 'name', 'labelCopy'])
  let allRelevantProps = Object.assign({}, rest, {
    name: name,
    labelCopy: labelCopy,
  })
  includesRequired(allRelevantProps)

  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(
    Object.keys(PrivateTextInput.PUBLIC_PROPS)
  )
  includesInvalid(rest)

  // Set up validation hooks
  const [getError, setError, validate] = useErrorMessage(validator)

  const doValidation = (value) => {
    const errMsg = validate(value)
    if (errMsg.length) {
      setError(errMsg)
    } else {
      setError('')
    }
  }

  const onBlur = (syntheticReactEvent) => {
    touched = true;
    doValidation(syntheticReactEvent.target.value)
  }

  const onChange = (syntheticReactEvent) => {
    if (!touched) return;
    doValidation(syntheticReactEvent.target.value)
  }

  return (
    <>
      <Body.Regular400
        element="label"
        htmlFor={name}
        color={COLORS.GRAY_PRIMARY}
      >
        {labelCopy}
      </Body.Regular400>
      <input
        type="text"
        className={!!getError() ? 'TextInput Error' : 'TextInput'}
        disabled={disabled}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
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
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
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
