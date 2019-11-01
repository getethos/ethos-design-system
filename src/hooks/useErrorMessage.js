import React, { useState } from 'react'
import { InfoMessage } from '../components/InfoMessage'
import { Spacer } from '../components'
import { INIT_INVALID } from '../helpers/constants.js'

const useErrorMessage = (validator) => {
  // TODO: remove and require validator to be passed if useErrorMessage used
  if (!validator) {
    console.warn(
      'useErrorMessage called without a validator—soon this will cause an error'
    )
  }
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

  const getFormattedError = (msg) => {
    if (msg) {
      return (
        <>
          <Spacer.H8 />
          <InfoMessage.Text.Error>{msg} </InfoMessage.Text.Error>
        </>
      )
    }
    return ''
  }

  const validate = (thingToValidate) => {
    return resolvedValidator.call(null, thingToValidate)
  }

  return [getError, setError, getFormattedError, validate]
}

export default useErrorMessage
