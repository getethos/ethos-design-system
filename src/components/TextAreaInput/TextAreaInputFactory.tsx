import * as React from 'react'
import { PrivateTextAreaInput } from './PrivateTextAreaInput'
export function TextAreaInputFactory(privateProps) {
  const PublicTextAreaInputComponent = (downstreamProps) => {
    return <PrivateTextAreaInput {...downstreamProps} {...privateProps} />
  }
  return PublicTextAreaInputComponent
}
