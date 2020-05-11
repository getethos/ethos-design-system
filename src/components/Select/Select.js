import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// See React-Select -- https://github.com/JedWatson/react-select for documentation
// on usage, Async configuration, etc.
import ReactSelect from 'react-select'
import ReactSelectAsync from 'react-select/async'
import ReactSelectAsyncCreatable from 'react-select/async-creatable'
import ReactSelectCreatable from 'react-select/creatable'
import useErrorMessage from '../../hooks/useErrorMessage.js'
import { InputLabel } from '../InputLabel'

import styles from './Select.module.scss'

export const Select = ({
  className,
  title,
  isAsync,
  isCompact,
  isCreatable,
  validator,
  onChange,
  formChangeHandler,
  currentError,
  formTouched,
  labelCopy,
  name,
  ...rest
}) => {
  console.log('Select props: ', {
    className,
    title,
    isAsync,
    isCompact,
    validator,
    onChange,
    formChangeHandler,
    currentError,
    formTouched,
    labelCopy,
    name,
  })
  const compactClass = isCompact ? styles.Compact : ''
  // Since we're using arrow function we need to come before props assignment below
  const onChangeHandler = (event) => {
    updateSelectedValue(event.value)
    if (onChange) {
      onChange(event)
    }
  }

  const props = {
    className: `${className ? className : ''} ${compactClass} ${styles.root}`,
    onChange: onChangeHandler,
    onBlur,
    'aria-label': title, // https://react-select.com/props#select-props
    ...rest,
  }
  const resolvedValidator = validator ? validator : () => ''
  const [getError, setError, , validate] = useErrorMessage(resolvedValidator)
  const [selectedValue, updateSelectedValue] = useState(undefined)

  const validationSelect = () => {
    const errorMessage = validate(selectedValue)
    setError(errorMessage)
    if (formChangeHandler) {
      formChangeHandler(selectedValue, errorMessage)
    }
  }

  useEffect(() => {
    const isSelectedValue = typeof selectedValue !== 'undefined'
    if (isSelectedValue) {
      validationSelect()
    }
  }, [selectedValue])

  const onBlur = () => {
    validationSelect()
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
    <div className={wrapperClass} data-tid={rest['data-tid']}>
      {labelCopy && <InputLabel name={name} labelCopy={labelCopy} />}
      {console.log('SelectTag ...props: ', { ...props })}
      <SelectTag {...props} />
      {title && <div className={styles.title}>{title}</div>}
      {getError(currentError, formTouched)}
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
  formChangeHandler: PropTypes.func,
  currentError: PropTypes.string,
  formTouched: PropTypes.bool,
  labelCopy: PropTypes.string,
  name: PropTypes.string,
  validator: PropTypes.func,
}

Select.defaultProps = {
  classNamePrefix: 'StyledReactSelect', // for styling
  className: undefined,
  placeholder: 'Type to search',
}
