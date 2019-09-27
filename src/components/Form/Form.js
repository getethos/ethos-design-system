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
 *    - `input`
 *      — A function which takes an argument, `inputName`,
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
 *    - See corresponding markdown example for details.
 *
 * @see See also: `src/hooks/useFormState.js`
 */

export function Form({ children, config }) {
  const inputNames = Object.keys(config.inputs)

  // Set up initial values
  let initialValues = {}
  inputNames.forEach((x) => {
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
    initialValues[x] = 'No answer supplied for ' + x
  })

  // Hooks
  const [
    getInputErrors,
    getInputValues,
    setStateFactory,
    getFormErrorMessage,
    setFormErrorMessage,
    getFormIsValid,
  ] = useFormState(initialValues)

  // Wrapper for default <form> submit function.
  async function onSubmit(syntheticReactEvent) {
    // Set the form-level error to disappear while the form tries to submit.
    setFormErrorMessage('')

    // Prevents normal form submission redirection
    syntheticReactEvent.preventDefault()

    // Check hook state to see if the form has any errors registered.
    // Ideally, forms should not have the submit button be clickable unless
    // all errors are clear by passing down getFormIsValid() to the `disabled`
    // prop on the submit button, but this is a backup in case they don't.
    if (!getFormIsValid()) {
      if (getInputErrors()) {
        setFormErrorMessage(
          'One of the inputs was invalid. Errors: ' + getInputErrors()
        )
      } else {
        setFormErrorMessage("You haven't typed anything yet")
      }
      return
    }

    // Await should always be wrapped in a try/catch!
    try {
      // Pass the form's values to whatever config.onSubmit wants to do
      await config.onSubmit(getInputValues())
    } catch (e) {
      setFormErrorMessage(e.toString())
    }
  }

  // Wrapper for all fields. Essentially this translates the field definition
  // from the json-friendly `config` prop into a named form field
  // with the necessary callbacks so the form can track its errors & value.
  function input(inputName) {
    // This just makes the rest of this easier to read
    const inputConfig = config.inputs[inputName]

    return config.componentMap(
      // Returns a component
      inputConfig.componentName,
      {
        // Field name. Used in the label to identify the field
        name: inputName,

        // The single callback which notifies the form of the error and
        // value for the input. The input still controls its own state
        // internally, but the form needs to know if it has errors
        // (to know if the form is valid) and what its value is (so it can
        // pass that to the onSubmit wrapper).
        formChangeHandler: setStateFactory(inputName),

        // Turns all validators from `config` into a single function which
        // runs all of them and concatenates them into a string.
        // Requires `config.validatorMap` to be supplied, because the
        // validators are simple js objects with a name and maybe arguments.
        validator: (input) =>
          inputConfig.validators
            .map((v) => config.validatorMap(v.name, v.args))
            .reduce((errors, validator) => errors.concat(validator(input)), [])
            .filter((x) => !!x) // remove empty strings
            .join(', '),

        // User-visible copy, shows up in the label above the field.
        labelCopy: inputConfig.labelCopy,

        // data-tid is helpful for writing tests.
        ['data-tid']: [config.formName, config.formId, inputName].join('-'),
      },

      // For things like ButtonGroupField, which may have options supplied.
      inputConfig.options || null
    )
  }

  return (
    <form onSubmit={onSubmit}>
      {/* See the top of this file or ./Form.md for help on how to use
        these arguments passed to the children function. */}
      {children(input, getFormErrorMessage, getFormIsValid)}
    </form>
  )
}
