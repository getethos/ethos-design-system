import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// See React-Select -- https://github.com/JedWatson/react-select for documentation
// on usage, Async configuration, etc.
import ReactSelect from 'react-select'
import ReactSelectAsync from 'react-select/async'
import ReactSelectAsyncCreatable from 'react-select/async-creatable'
import ReactSelectCreatable from 'react-select/creatable'
import useErrorMessage from '../../hooks/useErrorMessage.js'
import useInputValidation from '../../hooks/useInputValidation.js'
import { InputLabel } from '../InputLabel'

import styles from './Select.module.scss'

export const Select = ({
  className,
  title,
  isAsync,
  isCreatable,
  validator,
  onChange,
  formChangeHandler,
  currentError,
  formTouched,
  labelCopy,
  name,
  initialValue,
  options,
  ...rest
}) => {
  const resolvedValidator = validator ? validator : () => ''
  const [selectedOption, updateSelectedOption] = useState(initialValue)
  const [touched, setTouched] = useState(false)
  const [getError, setError, , validate] = useErrorMessage(resolvedValidator)
  const [doValidation] = useInputValidation({
    validate,
    setError,
    formChangeHandler,
  })

  useEffect(() => {
    const isSelectedValue = typeof selectedOption !== 'undefined'
    if (!!formChangeHandler && isSelectedValue && touched) {
      doValidation(selectedOption.value, touched)
    }
  }, [selectedOption])

  const onChangeHandler = (event) => {
    updateSelectedOption(options.find((option) => option.value === event.value))
    setTouched(true)

    if (onChange) {
      onChange(event)
    }
  }

  const onBlur = () => {
    setTouched(true)
    if (!!formChangeHandler) {
      const selectedValue = selectedOption ? selectedOption.value : undefined
      doValidation(selectedValue, true)
    }
  }

  const wrapperClass = title ? styles.wrapper : ''

  const props = {
    className: `${className ? className : ''} ${styles.root}`,
    onChange: onChangeHandler,
    onBlur,
    value: selectedOption,
    options,
    ...rest,
  }

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
      {labelCopy && <InputLabel name={name} labelCopy={labelCopy} />}
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
  title: PropTypes.string,
  className: PropTypes.string,
  isCreatable: PropTypes.bool,
  formChangeHandler: PropTypes.func,
  currentError: PropTypes.string,
  formTouched: PropTypes.bool,
  labelCopy: PropTypes.string,
  name: PropTypes.string,
  validator: PropTypes.func,
  initialValue: PropTypes.object,
}

Select.defaultProps = {
  classNamePrefix: 'StyledReactSelect', // for styling
  className: undefined,
  placeholder: 'Type to search',
}
