import { useState } from 'react'

let iteractedWith = false
let touched = false
let hiddenFields = {}

export function useFormState(initialState) {
  const [fieldErrorsState, setFieldErrorsState] = useState(initialState)
  const [fieldValuesState, setFieldValuesState] = useState(initialState)
  const [formErrorState, setFormErrorState] = useState('')

  // No fields are considered hidden initially. Within the JSX, consumer can
  // call hide('fieldName'), and from there we can update setFieldsHidden
  const initialHiddenState = {}
  Object.keys(initialState).map((key) => {
    initialHiddenState[key] = false
  })
  const [fieldsHiddenState, setFieldsHiddenState] = useState(initialHiddenState)

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
    const filteredFieldValues = _filterHiddenFields(fieldValuesState)
    return filteredFieldValues
  }

  function getFieldErrors() {
    const filteredFieldErrors = _filterHiddenFields(fieldErrorsState)
    return filteredFieldErrors
  }

  // Checks if any fields have errors; returns concatenated string
  function getFieldErrorsString() {
    return Object.values(getFieldErrors())
      .filter((x) => !!x)
      .join(', ')
  }

  // Form level error handling has seemingly pointless wrappers,
  // this is how useErrorMessage did it

  // Gets form error, a string
  function getFormErrorMessage() {
    return formErrorState
  }

  function _filterHiddenFields(obj) {
    const filteredObj = {}
    Object.keys(obj).forEach((key) => {
      // If not hidden field, add to considered field errors
      if (!hiddenFields[key]) {
        filteredObj[key] = obj[key]
      }
    })
    return filteredObj
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

  function getFieldsHidden() {
    return hiddenFields
  }

  function setFieldsHidden(fieldName, bool) {
    const hiddenField = {}
    hiddenField[fieldName] = bool
    hiddenFields = Object.assign({}, hiddenFields, hiddenField)
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
    setFieldsHidden,
  ]
}
