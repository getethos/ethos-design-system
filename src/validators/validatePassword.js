const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!#$%^&*])[a-zA-Z0-9!#$%^&*]{8,100}$/

const PASSWORD_CREATION_MIN_LENGTH = 8
const PASSWORD_CREATION_MIN_LENGTH_ERROR_MESSAGE = `Password must contain at least ${PASSWORD_CREATION_MIN_LENGTH} characters and have 3 of the following: a number, lowercase letter, uppercase letter, and special character.`
const PASSWORD_CREATION_REQUIRED_ERROR_MESSAGE = PASSWORD_CREATION_MIN_LENGTH_ERROR_MESSAGE
const PASSWORD_VERIFICATION_REQUIRED_ERROR_MESSAGE = `Please enter your password.`

export default function validatePassword(x) {
  if (!x) return PASSWORD_VERIFICATION_REQUIRED_ERROR_MESSAGE 
  return passwordRegex.test(x) ? '' : PASSWORD_CREATION_REQUIRED_ERROR_MESSAGE 
}
