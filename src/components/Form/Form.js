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
    setErrorStateFactory,
    getFormErrorMessage,
    setFormErrorMessage,
    getFormIsValid,
  ] = useFormState(initialValues)

  // Validates form, sets button to disabled if there's an error
  function inputNamePropsTransformer(inputName) {
    return {
      name: inputName,
      formErrorHandler: setErrorStateFactory(inputName),
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
    console.log('syntheticReactEvent', syntheticReactEvent)
    syntheticReactEvent.preventDefault()

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

    try {
      await config.onSubmit(syntheticReactEvent)
      alert('form submission successful')
    } catch {
      setFormErrorMessage('Form was invalid')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {children(inputNamePropsTransformer, getInputErrors, getFormErrorMessage)}
    </form>
  )
}
