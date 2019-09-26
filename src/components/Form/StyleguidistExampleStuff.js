import React from 'react'
import { TextInput } from '../index'

function validateMinMaxFactory(
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  message = `Must be between ${min} and ${max} characters`
) {
  function validateMinMax(value) {
    const valueString = value ? String(value) : ''
    const isInvalidMin = valueString && valueString.length < min
    const isInvalidMax = valueString && valueString.length > max
    return isInvalidMin || isInvalidMax ? message : undefined
  }

  return validateMinMax
}

function validateTruthy(x) {
  return !!x ? '' : 'Please provide input'
}

function ValidatorGenerator(validatorName, args) {
  switch (validatorName) {
    case 'truthy':
      return validateTruthy
    case 'minMax':
      return validateMinMaxFactory.apply(null, args)
    case 'exampleEvenNumber':
      return (x) =>
        x.length % 2 ? 'Text does not have an even number of characters' : ''
    default:
      throw new Error('bad validator name')
  }
}

function ComponentGenerator(componentName, props) {
  switch (componentName) {
    case 'TextInput':
      return <TextInput {...props} />
    default:
      throw new Error('whoopsie daisy')
  }
}

export { ComponentGenerator, ValidatorGenerator }
