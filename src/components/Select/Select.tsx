import * as React from 'react'
import { useEffect, useState } from 'react'
// See React-Select -- https://github.com/JedWatson/react-select for documentation
// on usage, Async configuration, etc.
import * as ReactSelect from 'react-select'
import { components, Props as ReactSelectProps } from 'react-select'
import * as ReactSelectAsync from 'react-select/async'
import * as ReactSelectAsyncCreatable from 'react-select/async-creatable'
import * as ReactSelectCreatable from 'react-select/creatable'
import useErrorMessage from '../../hooks/useErrorMessage'
import { PublicFormProps } from '../Form/Form'
import { InputLabel } from '../InputLabel'
import styles from './Select.module.scss'

type UserSelection = { label: string; value: string }

export const ReactSelectComponents: {
  ClearIndicator: any
  Control: any
  DropdownIndicator: any
  DownChevron: any
  CrossIcon: any
  Group: any
  GroupHeading: any
  IndicatorsContainer: any
  IndicatorSeparator: any
  Input: any
  LoadingIndicator: any | null
  Menu: any
  MenuList: any
  MenuPortal: any
  LoadingMessage: any
  NoOptionsMessage: any
  MultiValue: any
  MultiValueContainer: any
  MultiValueLabel: any
  MultiValueRemove: any
  Option: any
  Placeholder: any
  SelectContainer: any
  SingleValue: any
  ValueContainer: any
} = components

type SelectProps = PublicFormProps &
  ReactSelectProps & {
    classNamePrefix?: string
    isAsync?: boolean
    isCompact?: boolean
    title?: string
    className?: string
    isCreatable?: boolean
    labelCopy?: string
    allCaps?: boolean
  }
/**
 * Component which wraps [react-select](https://github.com/JedWatson/react-select). Note,
 * within the form engine, your validator should be able to handle the two potential shapes
 * react-select calls [onChange with](https://react-select.com/props#statemanager-props).
 * TL;DR is single select gets an object like:
 * {value: "abc", label: "abc"}, and multi: [{value: "abc", label: "abc"}]
 * So, a multi-select validator would likely want to loop and validate each items one by one.
 */
export const Select: React.SFC<SelectProps> = ({
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
  const [userSelection, updateUserSelection] = useState<
    UserSelection | UserSelection[] | undefined
  >(undefined)
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
  const onBlur = () => {
    validationSelect()
  }
  const props = {
    className: `${className ? className : ''} ${compactClass} ${styles.root}`,
    onChange: onChangeHandler,
    onBlur,
    'aria-label': title,
    ...rest,
  }
  const validationSelect = () => {
    if (!userSelection) return
    let errorMessage = ''
    let resolvedValues: string | string[] = ''
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
  const SelectTag = (getTag() as unknown) as React.ElementType
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
Select.defaultProps = {
  classNamePrefix: 'StyledReactSelect',
  className: undefined,
  placeholder: 'Type to search',
}
