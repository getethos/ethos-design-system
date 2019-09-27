import { useState } from 'react'

let touched = false

export function useFormState(initialState) {
  const [inputErrorsState, setInputErrorsState] = useState(initialState)
  const [inputValuesState, setInputValuesState] = useState(initialState)
  const [formErrorState, setFormErrorState] = useState('')

  // Returns a function that updates state for the input, tracked by inputName
  function setStateFactory(inputName) {
    return (newValue, newError) => {
      touched = true

      // Reset form errors if they exist
      setFormErrorState('')

      // Update values state
      setInputValuesState((inputValuesState) => ({
        ...inputValuesState,
        [inputName]: newValue,
      }))

      // Update errors state
      setInputErrorsState((inputErrorsState) => ({
        ...inputErrorsState,
        [inputName]: newError,
      }))
    }
  }

  // Gets values of all fields, basically just used in form submission
  function getInputValues() {
    return inputValuesState
  }

  // Checks if any inputs have errors; returns concatenated string
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

  // Verify form has been touched and also has no errors;
  // Used for determining whether a form is valid
  function getFormIsValid() {
    return touched && !getInputErrors()
  }

  return [
    getInputErrors,
    getInputValues,
    setStateFactory,
    getFormErrorMessage,
    setFormErrorMessage,
    getFormIsValid,
  ]
}
