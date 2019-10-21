import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from '../TextInput'
import styles from '../TextInput/TextInput.module.scss'
import errorStyles from '../Errors.module.scss'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import EmailFormatValidator from '../../../validators/EmailValidator'

const PrivateEmailInput = (props) => {
  const {
    name,
    optional,
    allCaps,
    labelCopy,
    validator,
    formChangeHandler,
    initialValue,
    currentValue,
    currentError,
    formTouched,
    placeholder,
    ...restProps
  } = props

  const [getError, setError, getFormattedError, validate] = useErrorMessage(
    validator
  )
  const val = currentValue || initialValue
  const [touched, setTouched] = useState(val ? true : false)
  const [value, setValue] = useState(val || '')

  const getClasses = () => {
    return !!getError()
      ? `BirthdateInput ${styles.TextInput} ${errorStyles.Error}`
      : `BirthdateInput ${styles.TextInput}`
  }

  return (
    <>
      <TextInput
        name="email-input"
        labelCopy={labelCopy}
        allCaps={allCaps}
        initialValue={value}
        optional={optional}
        type="email"
        data-tid={restProps['data-tid']}
        placeholder={placeholder}
        currentValue={currentValue}
        validator={EmailFormatValidator}
        currentError={currentError}
        formTouched={formTouched}
        setFieldTouched={restProps.setFieldTouched}
      />
      {getError(currentError, formTouched)}
    </>
  )
}

PrivateEmailInput.PUBLIC_PROPS = {
  optional: PropTypes.bool,
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  initialValue: PropTypes.string,
}

PrivateEmailInput.propTypes = {
  ...PrivateEmailInput.PUBLIC_PROPS,
}

PrivateEmailInput.defaultProps = {
  labelCopy: 'Email',
}

const EmailInputFactory = (privateProps) => {
  const PublicEmailInputComponent = (downstreamProps) => {
    return <PrivateEmailInput {...downstreamProps} {...privateProps} />
  }

  return PublicEmailInputComponent
}

export const EmailInput = EmailInputFactory()

export const EmailInputValidators = EmailFormatValidator
