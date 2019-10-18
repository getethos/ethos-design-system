import React, { useState } from 'react'
import { InfoMessage } from '../components/InfoMessage'
import { Spacer } from '../components'

const useErrorMessage = (validator) => {
  const [displayError, setDisplayError] = useState('')

  const setError = (msg) => {
    setDisplayError(msg)
  }

  const getError = () => {
    if (displayError) {
      // WIP do InfoMessage styling later
      return getFormattedError(displayError)
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
    return validator.call(null, thingToValidate)
  }

  return [getError, setError, getFormattedError, validate]
}

export default useErrorMessage
