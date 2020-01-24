import React from 'react'
import PropTypes from 'prop-types'
// See React-Select -- https://github.com/JedWatson/react-select for documentation
// on usage, Async configuration, etc.
import ReactSelect from 'react-select'
import ReactSelectAsync from 'react-select/async'
import ReactSelectAsyncCreatable from 'react-select/async-creatable'
import ReactSelectCreatable from 'react-select/creatable'

import styles from './Select.module.scss'

export const Select = ({
  className,
  title,
  isAsync,
  isCompact,
  isCreatable,
  ...rest
}) => {
  const compactClass = isCompact ? styles.Compact : ''
  const props = {
    className: `${className ? className : ''} ${compactClass} ${styles.root}`,
    ...rest,
  }

  const wrapperClass = title ? styles.wrapper : ''

  const getTag = () => {
    if (isAsync && isCreatable) {
      return ReactSelectAsyncCreatable
    } else if (isAsync) {
      return ReactSelectAsync
    } else if (isCreatable) {
      return ReactSelectCreatable
    } else {
      return ReactSelect
    }
  }

  const SelectTag = getTag()

  return (
    <div className={wrapperClass}>
      <SelectTag {...props} />
      {title && <div className={styles.title}>{title}</div>}
    </div>
  )
}

Select.propTypes = {
  classNamePrefix: PropTypes.string.isRequired,
  // loadOptions should take an inputValue and return a Promise that resolves
  // to an array of options.
  loadOptions: PropTypes.func,
  onChange: PropTypes.func,
  isAsync: PropTypes.bool,
  isCompact: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
  isCreatable: PropTypes.bool,
}

Select.defaultProps = {
  classNamePrefix: 'StyledReactSelect', // for styling
  className: undefined,
  placeholder: 'Type to search',
}
