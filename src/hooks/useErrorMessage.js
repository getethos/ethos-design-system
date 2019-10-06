import React, { useState } from 'react'
import { InfoMessage } from '../components/InfoMessage'
import { Spacer } from '../components'

const useErrorMessage = (validator) => {
  // Form's `validationSuccess` won't get called unless we succeed in validating.
  // But that requires a validator of some kind so this circumnavigates the issue.
  const noopValidator = () => ''
  validator = validator ? validator : noopValidator

  const [displayError, setDisplayError] = useState('')

  const setError = (msg) => {
    setDisplayError(msg)
  }

  const getError = () => {
    if (displayError) {
      // WIP do InfoMessage styling later
      return (
        <>
          <Spacer.H8 />
          <InfoMessage.Text.Error>{displayError} </InfoMessage.Text.Error>
        </>
      )
    }
    return ''
  }

  const validate = (thingToValidate) => {
    return validator.call(null, thingToValidate)
  }

  return [getError, setError, validate]
}

export default useErrorMessage
