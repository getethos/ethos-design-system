import * as React from 'react'
import { useEffect, useState } from 'react'
import { codes } from '../../helpers/constants.js'
import useErrorMessage from '../../hooks/useErrorMessage'
import useInputValidation from '../../hooks/useInputValidation'
import { Body } from '../Body.js'
import { COLORS } from '../Colors.js'
import errorStyles from '../Errors.module.scss'
import { PublicFormProps } from '../Form/Form'
import styles from './CheckboxInput.module.scss'
import { Facade } from './Facade'

type CheckboxInputProps = PublicFormProps & {
  initialValue?: string | boolean
  checked?: boolean
  currentValue?: string | boolean
  currentError?: string
  disabled?: boolean
  facadeRenderer?: (...args: any[]) => any
}
export const CheckboxInput: React.SFC<CheckboxInputProps> = ({
  formChangeHandler,
  validator,
  children,
  disabled,
  name,
  initialValue,
  currentValue,
  currentError,
  setFieldTouched,
  // TODO: pushed in from Form.js but not used here
  formTouched, // eslint-disable-line no-unused-vars
  checked,
  ...rest
}) => {
  const initialChecked = currentValue || initialValue || false
  const [touched, setTouched] = useState(initialValue ? true : false)
  const [isChecked, setIsChecked] = useState(initialChecked)
  const [getError, setError, , validate] = useErrorMessage(validator)
  const [doValidation] = useInputValidation({
    validate,
    setError,
    formChangeHandler,
  })
  // Initial Value aka prefilled—are considered "touched", but must prevalidate
  // which will in turn update the internal form state as to their validity
  useEffect(() => {
    if (!!formChangeHandler && initialValue) {
      doValidation(initialValue, true)
    }
  }, [])
  const onChange = (ev) => {
    // It feels like a checkbox isn't something you blur off of, so I'm electing to
    // call a checkbox touched when you check it
    if (!touched) setTouched(true)
    const val =
      ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    doValidation(val, touched)
    setIsChecked(val)
    if (setFieldTouched) {
      setFieldTouched(true)
    }
  }
  const onKeyPress = (ev) => {
    if (ev.keyCode === codes.SPACE) {
      const val =
        ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
      doValidation(!val, touched)
      setIsChecked(!val)
      if (setFieldTouched) {
        setFieldTouched(true)
      }
    }
  }
  const getFacade = () => {
    const klasses = getFacadeClasses()
    if (rest.facadeRenderer) {
      return rest.facadeRenderer(klasses)
    } else {
      return <Facade classes={klasses} />
    }
  }
  const getFacadeClasses = () => {
    return getError(currentError, touched)
      ? `${styles.Facade} FacadeError ${errorStyles.Error}`
      : `${styles.Facade} ${styles.FacadeBorder}`
  }
  const getClasses = () => {
    return getError(currentError, touched)
      ? `${styles.CheckboxInput} ${errorStyles.Error}`
      : `${styles.CheckboxInput}`
  }
  /**
   * If consumer's used the brute force `checked` prop, we prioritize that
   */
  const resolvedIsChecked = typeof checked !== 'undefined' ? checked : isChecked
  return (
    <>
      <label htmlFor={name} className={styles.root}>
        <div className={styles.checkboxWrapper}>
          <input
            className={getClasses()}
            type="checkbox"
            onChange={onChange}
            data-tid={rest['data-tid']}
            onKeyPress={onKeyPress}
            disabled={disabled}
            checked={!!resolvedIsChecked}
            id={name}
            name={name}
          />
          {getFacade()}
        </div>
        <Body.Regular400 color={COLORS.GRAY_PRIMARY}>
          {children}
        </Body.Regular400>
      </label>
      {getError(currentError, touched)}
    </>
  )
}
