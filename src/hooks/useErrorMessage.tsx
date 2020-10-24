// tslint:disable-next-line
import * as React from 'react'
import { useState } from 'react'
import { Spacer } from '../components'
import { InfoMessage } from '../components/InfoMessage'
import { INIT_INVALID } from '../helpers/constants.js'

// ethan - not sure why this hook was created in an unorthodox way but here i tried to bring it back to standard react pattern for formatted error
const FormattedError = ({ msg }: { msg: any }) => {
  return (
    <>
      <Spacer.H8 />
      <InfoMessage.Text.Error>{msg}</InfoMessage.Text.Error>
    </>
  )
}

const getFormattedError = (msg) => {
  if (msg) {
    return <FormattedError msg={msg} />
  }
  return ''
}

const useErrorMessage = (validator) => {
  const noopValidator = () => ''
  const resolvedValidator = validator ? validator : noopValidator

  const [displayError, setDisplayError] = useState('')

  const setError = (msg) => {
    setDisplayError(msg)
  }

  const getError = (currentError, fieldTouched) => {
    if (displayError) {
      return getFormattedError(displayError)
    } else {
      // If we don't have a display error we still have to account for the
      // the form state's currentError. For example, the user toggles a field
      // off then back on...this will cause a rerender with no display error
      if (currentError && fieldTouched && currentError !== INIT_INVALID) {
        return getFormattedError(currentError)
      }
    }
    return ''
  }

  const validate = (thingToValidate) => {
    return resolvedValidator.call(null, thingToValidate)
  }

  return [getError, setError, getFormattedError, validate] as const
}

export default useErrorMessage
