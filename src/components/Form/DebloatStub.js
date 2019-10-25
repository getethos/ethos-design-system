import validatePassword from '../../validators/validatePassword'
import EmailFormatValidator from '../../validators/EmailValidator'

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

// Assumes json has been parsed already
const mapJsonToFields = (json) => {
  const fields = {}
  Object.keys(json).forEach((fieldKey) => {
    const field = json[fieldKey]
    fields[fieldKey] = {}
    const validators = field.validators.reduce((acc, validator) => {
      acc.push(validatorsTable[validator])
      return acc
    }, [])

    fields[fieldKey] = field
    fields[fieldKey].validators = validators
  })
  return fields
}

const formFields = mapJsonToFields(json)

export default formFields
