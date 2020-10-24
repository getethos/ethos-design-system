import * as React from 'react'
import { Space } from './Space'
export function SpacerFactory(privateProps) {
  const PublicSpacerComponent = (downstreamProps) => {
    return <Space {...downstreamProps} {...privateProps} />
  }
  return PublicSpacerComponent
}
