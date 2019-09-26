import React from 'react'
import PropTypes from 'prop-types'

import { useFormState } from '../../hooks/useFormState'

/**
 * The `Form` component takes a `config` object, and uses the convention
 * of providing a callback function that you can place your `children`
 * JSX in. See corresponding markdown example for details.
 *
 * The callback provides the following _parameters_:
 * `input`—takes `inputName` and:
 * - Notifies form hook of its error status and new value
 *
 * `getFormErrorMessage`—Provides for "form level errors" e.g. for
 * presenting API errors, or messaging that relates to the entire form.
 * _Note that field level errors (or hints if you will) are handled via
 * the `validators` at the field level._
 *
 * `getFormIsValid`—Call this to determine if the form is generally valid.
 * Useful for determining whether to disable a submit button for example.
 *
 * @see See also: `src/hooks/useFormState.js`
 */

export function Form({ children, config }) {
  const inputNames = Object.keys(config.inputs)

  // Set up initial values
  let initialValues = {}
  inputNames.forEach((x) => {
    initialValues[x] = 'err' // by default inputs have "hidden" errors
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

  async function onSubmit(syntheticReactEvent) {
    setFormErrorMessage('')

    syntheticReactEvent.preventDefault()

    if (!getFormIsValid()) {
      // Should already be handled by form itself, but...
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
      setFormErrorMessage('Something bad happened: ' + e.toString())
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
