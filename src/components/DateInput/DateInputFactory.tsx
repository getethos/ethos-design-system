import * as React from 'react'
import { PrivateDateInput } from './PrivateDateInput'
export const DateInputFactory = (privateProps: any) => {
  const PublicDateInputComponent = (downstreamProps: any) => {
    return <PrivateDateInput {...downstreamProps} {...privateProps} />
  }

  return PublicDateInputComponent
}
