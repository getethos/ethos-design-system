import React from 'react'
import { TextInput } from '../index'
import validateTruthy from '../../validators/validateTruthy'
import validateMinMaxFactory from '../../validators/validateMinMax'
import { validateMinMaxDateFactory } from '../../validators/BirthdateInputValidator'
import { ButtonSelectGroup } from '../Inputs/ButtonSelectGroup/ButtonSelectGroup'
import { BirthdateInput } from '../Inputs/BirthdateInput/BirthdateInput'

function ValidatorGenerator(validatorName, args) {
  switch (validatorName) {
    case 'truthy':
      return validateTruthy
    case 'minMax':
      return validateMinMaxFactory.apply(null, args)
    case 'minMaxDate':
      return validateMinMaxDateFactory.apply(null, args)
    default:
      throw new Error('bad validator name')
  }
}

export { ValidatorGenerator }
