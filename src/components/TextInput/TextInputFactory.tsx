import * as React from 'react'
import { PrivateTextInput } from './PrivateTextInput'
export function TextInputFactory(privateProps) {
  const PublicTextInputComponent = (downstreamProps) => {
    return <PrivateTextInput {...downstreamProps} {...privateProps} />
  }
  return PublicTextInputComponent
}
