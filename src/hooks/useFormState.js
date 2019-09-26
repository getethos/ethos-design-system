import { useState } from 'react'

let touched = false

export function useFormState(initialState) {
  const [inputErrorsState, setInputErrorsState] = useState(initialState)
  const [formErrorState, setFormErrorState] = useState('')

  // Returns a function that updates state for the input, tracked by inputName
  function setErrorStateFactory(inputName) {
    return (newValue) => {
      touched = true
      setFormErrorState('')
      setInputErrorsState((inputErrorsState) => ({
        ...inputErrorsState,
        [inputName]: newValue,
      }))
    }
  }

  // Checks if any inputs have errors; returns boolean
  function getInputErrors() {
    return Object.values(inputErrorsState)
      .filter((x) => !!x)
      .join(', ')
  }

  // Form level error handling has seemingly pointless wrappers,
  // this is how useErrorMessage did it

  // Gets form error, a string
  function getFormErrorMessage() {
    return formErrorState
  }

  // Sets the form error, a string
  function setFormErrorMessage(msg) {
    setFormErrorState(msg)
  }

  // Verify form has been touched and also has no errors

  function getFormIsValid() {
    return !touched && !!getInputErrors()
  }

  return [
    getInputErrors,
    setErrorStateFactory,
    getFormErrorMessage,
    setFormErrorMessage,
    getFormIsValid,
  ]
}
