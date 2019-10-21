import React from 'react'
import PropTypes from 'prop-types'
import { TextInput } from '../TextInput'
import EmailFormatValidator from '../../../validators/EmailValidator'

export const EmailInput = (props) => {
  const {
    name,
    optional,
    allCaps,
    labelCopy,
    initialValue,
    placeholder,
    value,
    disabled,
    ...restProps
  } = props

  return (
    <>
      <TextInput
        name="email-input"
        labelCopy={labelCopy}
        allCaps={allCaps}
        initialValue={value}
        optional={optional}
        type="email"
        disabled={disabled}
        data-tid={restProps['data-tid']}
        placeholder={placeholder}
        validator={EmailFormatValidator}
      />
    </>
  )
}

EmailInput.propTypes = {
  optional: PropTypes.bool,
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  initialValue: PropTypes.string,
}

EmailInput.defaultProps = {
  labelCopy: 'Email',
}

export const EmailInputValidators = EmailFormatValidator
