import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from '../TextInput'
import EmailFormatValidator from '../../validators/EmailValidator'

export const EmailInput = (props) => {
  const {
    name,
    optional,
    allCaps,
    capitalize,
    labelCopy,
    initialValue,
    placeholder,
    disabled,
    autoComplete,
    ...restProps
  } = props

  const [value] = useState(initialValue || '')

  return (
    <>
      <TextInput
        name={name}
        labelCopy={labelCopy}
        allCaps={allCaps}
        capitalize={capitalize}
        initialValue={value}
        optional={optional}
        type="email"
        data-tid={restProps['data-tid']}
        disabled={disabled}
        placeholder={placeholder}
        validator={EmailFormatValidator}
        autoComplete={autoComplete}
        {...restProps}
      />
    </>
  )
}

EmailInput.propTypes = {
  optional: PropTypes.bool,
  'data-tid': PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  /** text transform capitalize label */
  capitalize: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string,
  labelColor: PropTypes.string,
  labelWeight: PropTypes.string,
  labelClasses: PropTypes.string,
  validator: PropTypes.func,
  initialValue: PropTypes.string,
  autoComplete: PropTypes.string,
  classOverrides: PropTypes.string,
}

EmailInput.defaultProps = {
  labelCopy: 'Email',
  placeholder: '',
}
