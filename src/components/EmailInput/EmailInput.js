import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from '../TextInput'
import EmailFormatValidator from '../../validators/EmailValidator'

export const EmailInput = (props) => {
  const {
    name,
    optional,
    allCaps,
    labelCopy,
    initialValue,
    placeholder,
    disabled,
    ...restProps
  } = props

  const [value] = useState(initialValue || '')

  return (
    <>
      <TextInput
        name={name}
        labelCopy={labelCopy}
        allCaps={allCaps}
        initialValue={value}
        optional={optional}
        type="email"
        data-tid={restProps['data-tid']}
        disabled={disabled}
        placeholder={placeholder}
        validator={EmailFormatValidator}
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
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  initialValue: PropTypes.string,
}

EmailInput.defaultProps = {
  labelCopy: 'Email',
  placeholder: '',
}
