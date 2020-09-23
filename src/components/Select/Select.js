import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// See React-Select -- https://github.com/JedWatson/react-select for documentation
// on usage, Async configuration, etc.
import ReactSelect, { components } from 'react-select'
import ReactSelectAsync from 'react-select/async'
import ReactSelectAsyncCreatable from 'react-select/async-creatable'
import ReactSelectCreatable from 'react-select/creatable'
import useErrorMessage from '../../hooks/useErrorMessage.js'
import { InputLabel } from '../InputLabel'

import styles from './Select.module.scss'

export const ReactSelectComponents = components

/**
 * Component which wraps [react-select](https://github.com/JedWatson/react-select). Note,
 * within the form engine, your validator should be able to handle the two potential shapes
 * react-select calls [onChange with](https://react-select.com/props#statemanager-props).
 * TL;DR is single select gets an object like:
 * {value: "abc", label: "abc"}, and multi: [{value: "abc", label: "abc"}]
 * So, a multi-select validator would likely want to loop and validate each items one by one.
 */
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
  allCaps = true,
  name,
  ...rest
}) => {
  const resolvedValidator = validator ? validator : () => ''
  const [getError, setError, , validate] = useErrorMessage(resolvedValidator)
  const compactClass = isCompact ? styles.Compact : ''

  // According to the react-select https://react-select.com/props#statemanager-props docs
  // type will be: one of<Object, Array<Object>, null, undefined>,
  // For single (object) in shape of:
  //    {value: "CA", label: "CA"}
  // for multi (array):
  //    [{"value": "CA", "label": "CA"}, {"value": "NY", "label": "NY"}]
  const [userSelection, updateUserSelection] = useState(undefined)
  const onChangeHandler = (lastSelection, actionMeta) => {
    /**
     * For multi selects, react-select allows the user to remove all the
     * selected items, and once there are no more, this will be `null`. But,
     * for our state and validation purposes, it's more convenient to resolve
     * this to an empty array here. This will in turn result in the form engine's
     * validator getting called with an empty array which is easier for it to do
     * meaningful validation against since it's already expecting an array.
     */
    if (!lastSelection) {
      // This condition should not happen for single selects because once user has
      // selected a value, react-select prevent removing. So only form multi selects.
      updateUserSelection([])
    } else {
      updateUserSelection(lastSelection)
    }
    if (onChange) {
      onChange(lastSelection, actionMeta)
    }
  }

  const props = {
    className: `${className ? className : ''} ${compactClass} ${styles.root}`,
    onChange: onChangeHandler,
    onBlur,
    'aria-label': title, // https://react-select.com/props#select-props
    ...rest,
  }

  const validationSelect = () => {
    let errorMessage = ''
    let resolvedValues = ''
    // react-select multi select case
    if (Array.isArray(userSelection)) {
      resolvedValues = userSelection.map((selection) => selection.value)
    } else {
      // react-select single select case
      resolvedValues = userSelection.value
    }

    errorMessage = validate(resolvedValues)
    setError(errorMessage)
    if (formChangeHandler) {
      formChangeHandler(resolvedValues, errorMessage)
    }
  }

  useEffect(() => {
    const isSelectedValue = typeof userSelection !== 'undefined'
    if (isSelectedValue) {
      validationSelect()
    }
  }, [userSelection])

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
      {labelCopy && (
        <InputLabel name={name} labelCopy={labelCopy} allCaps={allCaps} />
      )}
      <SelectTag {...props} />
      {title && <div className={styles.title}>{title}</div>}
      {getError(currentError, formTouched)}
    </div>
  )
}

Select.propTypes = {
  /** class name prefix */
  classNamePrefix: PropTypes.string,
  /** loadOptions should take an inputValue and return a Promise that resolves */
  // to an array of options.
  loadOptions: PropTypes.func,

  /** The last user's selection which will be one of:
   *  `<Object, Array<Object>, null, undefined>` according to the react-select docs.
   *  For single (object) in shape of: {value: "CA", label: "CA"}
   *  For multi (array): [{"value": "CA", "label": "CA"}, ...]
   */
  onChange: PropTypes.func,
  /** Is asynchronous (see react-select docs) */
  isAsync: PropTypes.bool,
  /** Is compact or shorter */
  isCompact: PropTypes.bool,
  /** The title for this select */
  title: PropTypes.string,
  /** className */
  className: PropTypes.string,
  /** Is creatable (see react-select docs) */
  isCreatable: PropTypes.bool,
  formChangeHandler: PropTypes.func,
  currentError: PropTypes.string,
  formTouched: PropTypes.bool,
  labelCopy: PropTypes.string,
  allCaps: PropTypes.bool,
  name: PropTypes.string,
  validator: PropTypes.func,
}

Select.defaultProps = {
  classNamePrefix: 'StyledReactSelect', // for styling
  className: undefined,
  placeholder: 'Type to search',
}
