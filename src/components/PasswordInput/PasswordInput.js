import React from 'react'
import { TextInput } from '../Inputs/TextInput'

export const PasswordInput = (props) => (
  <TextInput type="password" restrictIllegal={false} {...props} />
)
