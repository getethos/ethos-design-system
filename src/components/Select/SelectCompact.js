import React from 'react'
import PropTypes from 'prop-types'
import { Select } from './Select'
import styles from './SelectCompact.module.scss'

export const SelectCompact = (props) => {
  return <Select {...props} />
}

Select.propTypes = {
  className: PropTypes.string,
}

Select.defaultProps = {
  className: 'StyledReactSelect-Compact',
}
