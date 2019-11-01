// Regex pulled from here: https://stackoverflow.com/a/46181
const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const EMAIL_FORMAT_ERROR_MESSAGE = 'Please enter a valid email.'

const EmailFormatValidator = (email) => {
  return validEmailRegex.test(email) ? '' : EMAIL_FORMAT_ERROR_MESSAGE
}

export default EmailFormatValidator
