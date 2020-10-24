import * as React from 'react'
import { useEffect, useState } from 'react'
import { PublicFormProps } from '../../../components/Form/Form'
import { BaseTextAreaInput } from '../../../components/TextAreaInput/BaseTextAreaInput'
import useErrorMessage from '../../../hooks/useErrorMessage'
import useInputValidation from '../../../hooks/useInputValidation'
import styles from './NoraTextAreaInput.module.scss'
type NoraTextAreaInputProps = PublicFormProps & {
  disabled?: boolean
  value?: string
  labelCopy?: string
  labelClassName?: string
  textClassName?: string
  placeholder?: string
  onBlur?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onChange?: (...args: any[]) => any
  initialValue?: any
}
export const NoraTextAreaInput: React.SFC<NoraTextAreaInputProps> = ({
  disabled,
  name,
  value,
  labelCopy,
  labelClassName,
  textClassName,
  placeholder,
  onBlur,
  onFocus,
  onChange,
  formChangeHandler,
  validator,
  initialValue,
  currentValue,
  currentError,
  setFieldTouched,
  ...rest
}) => {
  const classes = [styles.NoraTextInput, textClassName].join(' ')
  // Set up validation hooks
  const [getError, setError, , validate] = useErrorMessage(validator)
  const [val, setVal] = useState(currentValue || initialValue || '')
  const [touched, setTouched] = useState(value || initialValue ? true : false)
  const [doValidation] = useInputValidation({
    validate,
    setError,
    formChangeHandler,
  })
  const handleChange = (ev) => {
    const val = ev.target.value
    setVal(val)
    // We call setTouched in onBlur, so can reliably call getter here
    doValidation(val, touched)
    if (onChange) onChange(ev)
  }
  const setAllTouched = () => {
    // We set touched to change the react state, but it's async and
    // processing still, so, we use a flag for doValidation
    setTouched(true)
    // Also tell the form we've been touched
    if (setFieldTouched) {
      setFieldTouched(true)
    }
  }
  /**
   * If consumer's used the brute force `value` prop, we prioritize that
   * (this is similar to what we're doing in CheckboxInput for `checked`)
   */
  const resolvedValue = typeof value !== 'undefined' ? value : val
  // Initial Value aka prefilled—are considered "touched", but must prevalidate
  // which will in turn update the internal form state as to their validity
  useEffect(() => {
    if (!!formChangeHandler && (resolvedValue || initialValue)) {
      doValidation(resolvedValue || initialValue, '')
    }
  }, [])
  const handleBlur = (ev) => {
    setAllTouched()
    doValidation(ev.target.value, true)
    if (onBlur) onBlur(ev)
  }
  // TODO: this indicates a field level error on the NoraTextAreaInput
  if (getError(currentError, touched)) {
    // console.log('NoraTextAreaInput field error: ', currentError)
  }
  return (
    <>
      {labelCopy && <label className={labelClassName}>{labelCopy}</label>}
      <BaseTextAreaInput
        className={classes}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        onBlur={handleBlur}
        onFocus={onFocus}
        onChange={handleChange}
        value={resolvedValue}
        data-tid={rest['data-tid']}
      />
    </>
  )
}
