import React from 'react'
import { TextInput } from '../index'
import validateTruthy from '../../validators/validateTruthy'
import validateMinMaxFactory from '../../validators/validateMinMax'
import { ButtonSelectGroup } from '../Inputs/ButtonSelectGroup/ButtonSelectGroup'
import { BirthdateInput } from '../Inputs/BirthdateInput/BirthdateInput'

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

function ComponentGenerator(componentName, props, options) {
  switch (componentName) {
    case 'TextInput':
      return <TextInput {...props} />
    case 'BirthdateInput':
      return <BirthdateInput {...props} />
    case 'ButtonSelectGroup':
      return (
        <ButtonSelectGroup {...props}>
          {options.map((x) => (
            <ButtonSelectGroup.Option value={x.value}>
              {x.copy}
            </ButtonSelectGroup.Option>
          ))}
        </ButtonSelectGroup>
      )
    default:
      throw new Error('whoopsie daisy')
  }
}

export { ComponentGenerator, ValidatorGenerator }
