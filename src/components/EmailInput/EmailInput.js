import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from '../TextInput'
import EmailFormatValidator from '../../validators/EmailValidator'
import { VALID_ICONS } from '../../helpers/constants'

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
    icon,
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
        icon={icon}
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
  /** iconPrefix and iconName work together to render icon in input. Please refer to https://fontawesome.com/v5/docs/apis/javascript/import-icons for more information about iconPrefix. Please refer to `fa.js` and https://fontawesome.com for more info about icon's name. Currently allowed icons are defined by VALID_ICONS at src/helpers/constants.js */
  icon: PropTypes.oneOf(Object.keys(VALID_ICONS)),
}

EmailInput.defaultProps = {
  labelCopy: 'Email',
  placeholder: '',
}
