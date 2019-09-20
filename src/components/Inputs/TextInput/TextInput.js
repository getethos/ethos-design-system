import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { INPUT_MODES } from '../../../constants'
import { InputLabel } from '../InputLabel'
import { InfoMessage } from '../../index'
import { Spacer } from '../../Spacer'
import useRequired from '../../../hooks/useRequired.js'
import useMinMaxLength from '../../../hooks/useMinMaxLength.js'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import useInvalid from '../../../hooks/useInvalid.js'

/* @getethos/design-system/TextInput.js

/**
 * WIP
 *
 * @param  {String}   props.name        Input name and htmlFor prop for label
 * @param  {String}   props.inputMode   Which keyboard (alpha or numeric) to use
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
  inputMode,
  name,
  minLength = 0,
  maxLength = Number.MAX_SAFE_INTEGER,
  labelCopy,
  allCaps,
  validator,
  onChange,
  forcedErrorMessage,
  value,
  ...rest
}) {
  // Verify that all required props were supplied
  // const [includesRequired] = useRequired(['data-tid', 'name', 'labelCopy'])
  // let allRelevantProps = Object.assign({}, rest, {
  //   name: name,
  //   minLength: minLength,
  //   maxLength: maxLength,
  //   labelCopy: labelCopy,
  //   allCaps: allCaps,
  // })
  // includesRequired(allRelevantProps)

  // Verify that no invalid props were supplied
  // const [includesInvalid] = useInvalid(
  //   Object.keys(PrivateTextInput.PUBLIC_PROPS)
  // )
  // includesInvalid(rest)

  // Set up validation hooks
  // const [getError, setError, validate] = useErrorMessage(validator)
  // const [minMaxValidator] = useMinMaxLength(minLength, maxLength)

  // const [value, setValue] = useState('')

  // const doValidation = (value) => {
  //   if (forcedErrorMessage) {
  //     setError(forcedErrorMessage)
  //     return
  //   }

  //   const minMaxError = minMaxValidator(value)
  //   if (minMaxError) {
  //     setError(minMaxError)
  //     return
  //   }
  //   const errMsg = validate(value)
  //   if (errMsg.length) {
  //     setError(errMsg)
  //   } else {
  //     setError('')
  //   }
  // }

  const [touched, setTouched] = useState(false)

  const onBlur = (syntheticReactEvent) => {
    //   const cleansed = cleanse(syntheticReactEvent.target.value)
    setTouched(true)
  }

  // const illegalRegex = /[*|\":<>[\]{}`\\()';=@&$]/g
  // const restrict = (val) => val.replace(illegalRegex, '')

  // const privateOnChange = (ev) => {
  //   const val = event.target.value
  //   const restrictedVal = restrict(val)
  //   setValue(restrictedVal)
  //   if (!touched) {
  //     return
  //   }
  //   doValidation(restrictedVal)

  //   if (!!onChange) {
  //     onChange(ev)
  //   }
  // }

  const onPaste = (ev) => {
    const val = ev.clipboardData.getData('text/plain')
    const restrictedVal = restrict(val)
    setValue(restrictedVal)
  }

  const err =
    touched && forcedErrorMessage ? (
      <>
        <Spacer.H8 />
        <InfoMessage.Text.Error>{forcedErrorMessage} </InfoMessage.Text.Error>
      </>
    ) : null

  return (
    <>
      <InputLabel name={name} labelCopy={labelCopy} />
      <input
        type="text"
        inputMode={inputMode}
        className={!!err ? 'TextInput Error' : 'TextInput'}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
        onPaste={onPaste}
        onChange={onChange}
        value={value}
        data-tid={rest['data-tid']}
      />
      {err}
    </>
  )
}

PrivateTextInput.PUBLIC_PROPS = {
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  // This is a newer way to trigger the mobile numeric keypad (old way was
  // `type='tel'`.) For now, we probably either want to leave this unset, in
  // which case it is equivalent to 'text', or set 'numeric' for numeric inputs.
  inputMode: PropTypes.oneOf(Object.values(INPUT_MODES)),
  name: PropTypes.string.isRequired,
  allCaps: PropTypes.bool,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  forcedErrorMessage: PropTypes.string,
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
