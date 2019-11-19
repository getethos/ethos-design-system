import React from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import ReactSelectAsync from 'react-select/Async'

import styles from './Select.module.scss'

export const Select = ({ className, isAsync, ...rest }) => {
  const props = { className: `${className} ${styles.root}`, ...rest }
  if (isAsync) {
    return <ReactSelectAsync {...props} />
  }
  return <ReactSelect {...props} />
}

Select.propTypes = {
  classNamePrefix: PropTypes.string.isRequired,
  // loadOptions should take an inputValue and return a Promise that resolves
  // to an array of options.
  loadOptions: PropTypes.func,
  onChange: PropTypes.func,
  isAsync: PropTypes.bool,
  className: PropTypes.string,
}

Select.defaultProps = {
  classNamePrefix: 'StyledReactSelect', // for styling
  placeholder: 'Type to search',
}
