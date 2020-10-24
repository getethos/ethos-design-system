import * as React from 'react'
import { PrivateButton } from './PrivateButton'
export function ButtonFactory(privateProps: any) {
  const PublicButtonComponent = (downstreamProps: any) => {
    return <PrivateButton {...downstreamProps} {...privateProps} />
  }
  return PublicButtonComponent
}
