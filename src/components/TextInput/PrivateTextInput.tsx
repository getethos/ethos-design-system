import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useEffect, useState } from 'react'
import restrict from '../../helpers/restrict.js'
import useErrorMessage from '../../hooks/useErrorMessage'
import useInputValidation from '../../hooks/useInputValidation'
import useInvalid from '../../hooks/useInvalid.js'
import useRequired from '../../hooks/useRequired.js'
import errorStyles from '../Errors.module.scss'
import { PublicFormProps } from '../Form/Form'
import { InputLabel } from '../InputLabel'
import styles from './TextInput.module.scss'
const PUBLIC_PROPS = {
  type: PropTypes.string,
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  allCaps: PropTypes.bool,
  /** text transform capitalize label */
  capitalize: PropTypes.bool,
  initialValue: PropTypes.string,
  labelCopy: PropTypes.string,
  validator: PropTypes.func,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  restrictIllegal: PropTypes.bool,
}
type PrivateTextInputProps = PublicFormProps & {
  type?: string
  disabled?: boolean
  allCaps?: boolean
  capitalize?: boolean
  initialValue?: string
  currentValue?: string
  currentError?: any
  labelCopy?: string
  placeholder?: string
  onBlur?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  restrictIllegal?: boolean
}
export const PrivateTextInput: React.FC<PrivateTextInputProps> & {
  PUBLIC_PROPS: typeof PUBLIC_PROPS
} = ({
  type,
  disabled,
  name,
  labelCopy,
  allCaps,
  capitalize,
  formChangeHandler,
  validator,
  initialValue,
  currentValue,
  currentError,
  setFieldTouched,
  restrictIllegal,
  ...rest
}) => {
  // Verify that all required props were supplied
  const [includesRequired] = useRequired(['data-tid', 'name'])
  let allRelevantProps = Object.assign({}, rest, {
    name: name,
    allCaps: allCaps,
    capitalize: capitalize,
  })
  includesRequired(allRelevantProps)
  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(
    Object.keys(PrivateTextInput.PUBLIC_PROPS)
  )
  includesInvalid(rest)
  // Set up validation hooks
  const [getError, setError, , validate] = useErrorMessage(validator)
  const [value, setValue] = useState(currentValue || initialValue || '')
  const [touched, setTouched] = useState(initialValue ? true : false)
  const [doValidation] = useInputValidation({
    validate,
    setError,
    formChangeHandler,
  })
  const onChange = (ev) => {
    const val = ev.target.value
    const restrictedVal = restrictIllegal ? restrict(val) : val
    setValue(restrictedVal)
    // We call setTouched in onBlur, so can reliably call getter here
    doValidation(restrictedVal, touched)
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
  // Initial Value aka prefilled—are considered "touched", but must prevalidate
  // which will in turn update the internal form state as to their validity
  useEffect(() => {
    if (!!formChangeHandler && initialValue) {
      doValidation(initialValue, true)
    }
  }, [])
  const onBlur = (ev) => {
    setAllTouched()
    doValidation(ev.target.value, true)
  }
  const getClasses = () => {
    return getError(currentError, touched)
      ? `${styles.TextInput} ${errorStyles.Error}`
      : `${styles.TextInput}`
  }
  return (
    <>
      {labelCopy && (
        <InputLabel
          name={name}
          labelCopy={labelCopy}
          allCaps={allCaps}
          capitalize={capitalize}
        />
      )}
      <input
        type={type}
        className={getClasses()}
        disabled={disabled}
        name={name}
        placeholder={rest.placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        data-tid={rest['data-tid']}
        aria-label={name} // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute
      />
      {getError(currentError, touched)}
    </>
  )
}
PrivateTextInput.PUBLIC_PROPS = PUBLIC_PROPS
PrivateTextInput.defaultProps = {
  type: 'text',
  placeholder: '',
  restrictIllegal: true,
}
