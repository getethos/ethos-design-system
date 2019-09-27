import React from 'react'
import { TextInput } from '../index'
import validateTruthy from '../../validators/validateTruthy'
import validateMinMaxFactory from '../../validators/validateMinMax'

function ValidatorGenerator(validatorName, args) {
  switch (validatorName) {
    case 'truthy':
      return validateTruthy
    case 'minMax':
      return validateMinMaxFactory.apply(null, args)
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
