import { useState } from 'react'

let iteractedWith = false
let touched = false

export function useFormState(initialState) {
  const [fieldErrorsState, setFieldErrorsState] = useState(initialState)
  const [fieldValuesState, setFieldValuesState] = useState(initialState)
  const [formErrorState, setFormErrorState] = useState('')

  // Returns a function that updates state for the field, tracked by fieldName
  function setFieldState(fieldName) {
    return (newValue, newError) => {
      iteractedWith = true

      // Reset form errors if they exist
      setFormErrorState('')

      // Update values state
      setFieldValuesState((fieldValuesStatePrevious) => ({
        ...fieldValuesStatePrevious,
        [fieldName]: newValue,
      }))

      // Update errors state
      setFieldErrorsState((fieldErrorsStatePrevious) => ({
        ...fieldErrorsStatePrevious,
        [fieldName]: newError,
      }))
    }
  }

  function getFormInteractedWith() {
    return iteractedWith
  }

  // Gets values of all fields, basically just used in form submission
  function getFieldValues() {
    return fieldValuesState
  }

  function getFieldErrors() {
    return fieldErrorsState
  }

  // Checks if any fields have errors; returns concatenated string
  function getFieldErrorsString() {
    return Object.values(fieldErrorsState)
      .filter((x) => !!x)
      .join(', ')
  }

  // Form level error handling has seemingly pointless wrappers,
  // this is how useErrorMessage did it

  // Gets form error, a string
  function getFormErrorMessage() {
    return formErrorState
  }

  // Sets the form error, a string. Called by Form.js `onSubmit`
  function setFormErrorMessage(msg) {
    setFormErrorState(msg)
  }

  function setFormTouched() {
    touched = true
  }

  // Verify form has been iteractedWith and also has no errors;
  // Used for determining whether a form is valid
  function getFormIsValid() {
    return iteractedWith && !getFieldErrorsString()
  }

  return [
    touched,
    setFormTouched,
    getFieldErrorsString,
    getFieldErrors,
    getFieldValues,
    setFieldState,
    getFormErrorMessage,
    setFormErrorMessage,
    getFormIsValid,
    getFormInteractedWith,
  ]
}
