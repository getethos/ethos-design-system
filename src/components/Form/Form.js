import React from 'react'
import PropTypes from 'prop-types'

import { useFormState } from '../../hooks/useFormState'

/**
 * Some underlying principles of this component:
 *
 *  - The Form takes one prop, `config`, which defines all of its
 *    behavior.
 *    - `config` schema definition TBA
 *  - All Fields used in the Form notify the Form of their value and error state
 *    whenever changed
 *  - The Form only controls form-level errors; Fields control and display their
 *    own errors.
 *  - Visible errors in Fields are passed to Form and are exact representations
 *    of the errors which prevent the Form from being submitted.
 *  - The Form uses the "Function as Child Component" pattern, and supplies
 *    the following arguments:
 *    - `field`
 *      — A function which takes an argument, `fieldName`,
 *        and provides it a set of props which serve to notify the Form
 *        of changes in error state and value state
 *    - `getFormErrorMessage`
 *      — Provides for "form level errors" e.g. for presenting API errors,
 *        or messaging that relates to the entire form.
 *        (Field level errors (or 'hints') are handled via
 *        the `validators` at the field level, which is part of the `config`
 *    - `getFormIsValid`
 *      — Call this to determine if the form is generally valid.
 *        Useful for determining whether to disable a submit button for example.
 *    - `getFormInteractedWith`
 *      — Call to determine if the form has been interacted with. This
 *        corresponds with a field being entered and a characted typed, a
 *        button group clicked, etc.
 *    - See corresponding markdown example for details.
 *
 * @see See also: `src/hooks/useFormState.js`
 */

export function Form({ children, config }) {
  const fieldNames = Object.keys(config.fields)

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
  const formAutocomplete = config.autocompleteOff ? 'off' : 'on'

  // Set up initial values
  let initialValues = {}
  fieldNames.forEach((x) => {
    // By default fields have "hidden" errors declared here.
    //
    // Setting the error states to a truthy text means that the initial state
    // of a form will have all fields marked as invalid.
    // After being touched, the validators for each field will handle whether
    // it has errors.
    //
    // If we wanted to have a form be optional, you could have its initial
    // value set to empty string, so the form could be submitted without
    // the field being touched.
    initialValues[x] = `Initial invalid state for ${x}`
  })

  // Hooks
  const [
    getFieldErrors,
    getFieldValues,
    setFieldState,
    getFormErrorMessage,
    setFormErrorMessage,
    getFormIsValid,
    getFormInteractedWith,
  ] = useFormState(initialValues)

  // Wrapper for default <form> submit function.
  async function onSubmit(ev) {
    setFormErrorMessage('')
    ev.preventDefault()

    // Check hook state to see if the form has any errors registered.
    // Ideally, forms should not have the submit button be clickable unless
    // all errors are clear by passing down getFormIsValid() to the `disabled`
    // prop on the submit button, but this is a backup in case they don't.
    if (!getFormIsValid()) {
      if (getFieldErrors()) {
        setFormErrorMessage('Errors: ' + getFieldErrors())
      } else {
        setFormErrorMessage("You haven't typed anything yet")
      }
      return
    }

    try {
      // Pass the form's values to whatever config.onSubmit wants to do
      await config.onSubmit(getFieldValues())
    } catch (e) {
      setFormErrorMessage(e.toString())
    }
  }

  // Wrapper for all fields. Essentially, this translates the field definitions
  // from the config` prop into a form field with validation and proper callbacks.
  // with the necessary callbacks so the form can track its errors & value.
  function field(fieldName) {
    // This just makes the rest of this easier to read
    const fieldConfig = config.fields[fieldName]

    const doValidation = (fieldValue) => {
      if (!fieldConfig.validators) return ''

      const errorMessages = fieldConfig.validators
        .reduce((errorsAccumulator, validator) => {
          return errorsAccumulator.concat(validator(fieldValue))
        }, [])
        .filter((x) => !!x) // remove empty strings
        .join('. ')

      // if field was configured with and array of validationSuccess
      // and we have no errors, we want to call each success hook here
      if (!errorMessages && fieldConfig.validationSuccess) {
        doValidationSuccess(fieldValue)
      }
      return errorMessages
    }

    // This supports things like calling analytics upon field validation
    const doValidationSuccess = (fieldValue) => {
      fieldConfig.validationSuccess.forEach((postValidationCallback) => {
        postValidationCallback.call(null, fieldName, fieldValue)
      })
    }

    return fieldConfig.component(
      {
        // Field name. Used in the label to identify the field
        name: fieldName,

        // A callback which fields can call to update the form's errors
        // and values state for that same field. The field still controls
        // its own state internally, but the form needs to know if it has
        // errors (to know if the overall form is valid or not), and what
        // its value is (so it can later pass that to the onSubmit wrapper).
        // The validitiy of a form is essentially verified by
        // `touched && !getFieldErrors()`, and so, setting error and value
        // states here affects whether the form is ultimately valid or not.
        formChangeHandler: setFieldState(fieldName),

        // validators are functions which return an empty string if they pass
        // or an error message if they fail.
        //
        // if multiple validators fail, their errors will be combined together.
        validator: doValidation,

        // User-visible copy, shows up in the label above the field.
        labelCopy: fieldConfig.labelCopy,

        // data-tid is helpful for writing tests.
        // sometimes it's passed in, but if it isn't,
        // we will automatically generate one
        ['data-tid']:
          fieldConfig.tid ||
          [config.formName, config.formId, fieldName].join('-'),
      },

      // For things like ButtonGroupField, which may have options supplied.
      fieldConfig.options || null
    )
  }

  return (
    <form onSubmit={onSubmit} autoComplete={formAutocomplete}>
      {/* See the top of this file or ./Form.md for help on how to use
        these arguments passed to the children function. */}
      {children({
        field,
        getFormErrorMessage,
        getFormIsValid,
        getFormInteractedWith,
      })}
    </form>
  )
}
