import React from 'react'
import validatePassword from '../../validators/validatePassword'
import EmailFormatValidator from '../../validators/EmailValidator'
import { EmailInput, PasswordInput } from '../index'

// This might be plucked out of routeData.data.emailpage.fields or something similar
const json = {
  email: {
    placeholder: 'example@ethoslife.com',
    name: 'the-email',
    labelCopy: 'Email ',
    tid: 'the-email-tid',
    validators: ['EmailFormatValidator'],
  },
  password: {
    placeholder: 'password...',
    name: 'the-password',
    labelCopy: 'Password',
    tid: 'the-password-tid',
    validators: ['validatePassword'],
  },
}

const validatorsTable = {
  validatePassword: validatePassword,
  EmailFormatValidator: EmailFormatValidator,
}

const componentsTable = {
  email: (props, options) => {
    return <EmailInput {...props} placeholder={json.email.placeholder} />
  },
  password: (props, options) => {
    return <PasswordInput {...props} placeholder={json.password.placeholder} />
  },
}

// Assumes json has been parsed already
const mapJsonToFields = (json) => {
  const fields = {}
  Object.keys(json).forEach((fieldKey) => {
    fields[fieldKey] = {}
    const field = json[fieldKey]
    fields[fieldKey] = field
    const validators = field.validators.reduce((acc, validator) => {
      acc.push(validatorsTable[validator])
      return acc
    }, [])
    fields[fieldKey].validators = validators
    fields[fieldKey].component = componentsTable[fieldKey]
  })
  return fields
}

const formFields = mapJsonToFields(json)

export default formFields
