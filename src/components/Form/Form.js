import React from 'react'
import PropTypes from 'prop-types'

import { useFormState } from '../../hooks/useFormState'

export function Form({ children, config, render }) {
  const inputNames = Object.keys(config.inputs)

  // Set up initial values
  let initialValues = {}
  inputNames.forEach((x) => {
    initialValues[x] = null
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
  function inputNamePropsTransformer(inputName) {
    return {
      name: inputName,
      formChangeHandler: setStateFactory(inputName),
      validator: (input) =>
        config.inputs[inputName].validators
          .reduce((errors, validator) => errors.concat(validator(input)), [])
          .filter((x) => !!x) // remove empty strings
          .join(', '),
      labelCopy: config.inputs[inputName].labelCopy,
      ['data-tid']: [config.formName, config.formId, inputName].join('-'),
    }
  }

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
      alert(
        'form submission successful with values:' +
          JSON.stringify(getInputValues())
      )
    } catch (e) {
      setFormErrorMessage('Something bad happened: ' + e.toString())
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {children(
        inputNamePropsTransformer,
        getInputErrors,
        getFormErrorMessage,
        getFormIsValid
      )}
    </form>
  )
}
