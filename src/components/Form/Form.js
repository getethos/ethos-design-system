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
    initialValues[x] = 'err'
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
    // All registered errors should have
    if (!getFormIsValid()) {
      // Ideally, forms should not have the submit button be clickable
      if (getInputErrors()) {
        setFormErrorMessage(
          'One of the inputs was invalid. Errors: ' + getInputErrors()
        )
      } else {
        setFormErrorMessage("You haven't typed anything yet")
      }
      return
    }

    try {
      await config.onSubmit(getInputValues())
    } catch (e) {
      setFormErrorMessage(e.toString())
    }
  }

  function input(inputName) {
    const inputConfig = config.inputs[inputName]
    return config.componentMap(inputConfig.componentName, {
      name: inputName,
      formChangeHandler: setStateFactory(inputName),
      validator: (input) =>
        inputConfig.validators
          .map((v) => config.validatorMap(v.name, v.args))
          .reduce((errors, validator) => errors.concat(validator(input)), [])
          .filter((x) => !!x) // remove empty strings
          .join(', '),
      labelCopy: inputConfig.labelCopy,
      ['data-tid']: [config.formName, config.formId, inputName].join('-'),
    })
  }

  return (
    <form onSubmit={onSubmit}>
      {children(input, getFormErrorMessage, getFormIsValid)}
    </form>
  )
}
