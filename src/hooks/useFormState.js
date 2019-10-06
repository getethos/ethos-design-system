import { useState } from 'react'

let touched = false

export function useFormState(initialState) {
  const [fieldErrorsState, setFieldErrorsState] = useState(initialState)
  const [fieldValuesState, setFieldValuesState] = useState(initialState)
  const [formErrorState, setFormErrorState] = useState('')

  // Returns a function that updates state for the field, tracked by fieldName
  function setFieldState(fieldName) {
    return (newValue, newError) => {
      touched = true

      // Reset form errors if they exist
      setFormErrorState('')

      // Update values state
      setFieldValuesState((fieldValuesState) => ({
        ...fieldValuesState,
        [fieldName]: newValue,
      }))

      // Update errors state
      setFieldErrorsState((fieldErrorsState) => ({
        ...fieldErrorsState,
        [fieldName]: newError,
      }))
    }
  }

  function getFormInteractedWith() {
    return touched
  }

  // Gets values of all fields, basically just used in form submission
  function getFieldValues() {
    return fieldValuesState
  }

  // Checks if any fields have errors; returns concatenated string
  function getFieldErrors() {
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

  // Verify form has been touched and also has no errors;
  // Used for determining whether a form is valid
  function getFormIsValid() {
    return touched && !getFieldErrors()
  }

  return [
    getFieldErrors,
    getFieldValues,
    setFieldState,
    getFormErrorMessage,
    setFormErrorMessage,
    getFormIsValid,
    getFormInteractedWith,
  ]
}
