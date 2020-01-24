import React from 'react'
import { Select } from './Select'
import styles from './SelectCompact.scss'

export const SelectCompact = ({ className, ...rest }) => {
  const props = {
    className: `${className ? className : ''} SelectCompact`,
    ...rest,
  }

  return <Select {...props} />
}
