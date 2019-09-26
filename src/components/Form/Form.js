import React from 'react'
import PropTypes from 'prop-types'

import { useFormState } from '../../hooks/useFormState'

export function Form({ children, config, render }) {
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

  // Validates form, sets button to disabled if there's an error
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
      {children(input, getInputErrors, getFormErrorMessage, getFormIsValid)}
    </form>
  )
}
