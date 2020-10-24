import * as React from 'react'
import { TextInput } from '../TextInput'
export const PasswordInput = (props) => (
  <TextInput type="password" restrictIllegal={false} {...props} />
)
