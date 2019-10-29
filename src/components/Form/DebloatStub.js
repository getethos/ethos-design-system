/**
 * This stub file is meant to show an example of JSON fields data, and corresponding
 * lookup tables we can use to map endpoint JSON data to field config objects that
 * work with the Form Engine API. In theory, these could be somewhat arbitrarily
 * configured as long as the Resolver still works.
 */

import React from 'react'
import validatePassword from '../../validators/validatePassword'
import EmailFormatValidator from '../../validators/EmailValidator'
import { EmailInput, PasswordInput } from '../index'

// This might be plucked out of routeData.data.emailpage.fields or something similar
export const json = {
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

/**
 * The keys in a validator lookup table need to match with those in the JSON
 * data. The values do not (e.g. if we decide to rename a validator).
 */
export const validatorsTable = {
  validatePassword: validatePassword,
  EmailFormatValidator: EmailFormatValidator,
}

/**
 * The keys in the components lookup table should match the field keys in the
 * JSON data. The function value should always take `props` and `options` to
 * match the API defined in Form.js.
 */
export const componentsTable = {
  email: (props, options) => {
    return <EmailInput {...props} placeholder={json.email.placeholder} />
  },
  password: (props, options) => {
    return <PasswordInput {...props} placeholder={json.password.placeholder} />
  },
}
