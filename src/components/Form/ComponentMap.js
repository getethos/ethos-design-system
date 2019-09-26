import React from 'react'
import { TextInput } from '../index'

export default function GenerateComponent(componentName, props) {
  switch (componentName) {
    case 'TextInput':
      return <TextInput {...props} />
    default:
      throw new Error('whoopsie daisy')
  }
}
