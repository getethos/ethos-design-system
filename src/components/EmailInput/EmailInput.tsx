import * as React from 'react'
import { useState } from 'react'
import { TextInput } from '../TextInput'
import EmailFormatValidator from '../../validators/EmailValidator'
import { PublicFormProps } from '../Form/Form'
type EmailInputProps = PublicFormProps & {
  placeholder?: string
  disabled?: boolean
  allCaps?: boolean
  capitalize?: boolean
  labelCopy?: string
  initialValue?: string
}
export const EmailInput: React.SFC<EmailInputProps> = (props) => {
  const {
    name,
    optional,
    allCaps,
    capitalize,
    labelCopy = 'Email',
    initialValue,
    placeholder = '',
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
        capitalize={capitalize}
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
