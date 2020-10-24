import * as React from 'react'
import { useEffect, useState } from 'react'
import { codes } from '../../helpers/constants.js'
import useErrorMessage from '../../hooks/useErrorMessage'
import useInputValidation from '../../hooks/useInputValidation'
import { Body2 } from '../Body2.js'
import styles from '../CheckboxInput/CheckboxInput.module.scss'
import { Facade } from '../CheckboxInput/Facade'
import { COLORS } from '../Colors.js'
import errorStyles from '../Errors.module.scss'
import { PublicFormProps } from '../Form/Form'
import { Tooltip } from '../Tooltip/Tooltip'
import { InfoIcon } from './InfoIcon'

type CheckboxInput2Props = PublicFormProps & {
  initialValue?: string | boolean
  checked?: boolean
  currentValue?: string | boolean
  currentError?: string
  disabled?: boolean
  facadeRenderer?: (...args: any[]) => any
  tooltip?: {
    label?: any
    details?: any
    placement?: any
    popperBoxStyles?: any
  }
  variant?: 'default' | 'textonly'
}
export const CheckboxInput2: React.SFC<CheckboxInput2Props> = ({
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
  tooltip,
  variant = 'default',
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
  /**
   * If consumer's used the brute force `checked` prop, we prioritize that
   */
  const resolvedIsChecked = typeof checked !== 'undefined' ? checked : isChecked
  const error = getError(currentError, touched)
  return (
    <>
      <div
        className={styles.root2}
        data-checked={resolvedIsChecked}
        data-disabled={disabled}
        data-error={!!error}
        data-variant={variant}
      >
        <label
          htmlFor={name}
          className={`${styles.label} ${
            tooltip ? styles.labelWithTooltip : ''
          }`}
        >
          <div className={styles.checkboxWrapper2}>
            <input
              className={`${styles.CheckboxInput} ${
                error ? errorStyles.Error : ''
              }`}
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
          <Body2.Regular400
            color={
              variant === 'textonly' && resolvedIsChecked
                ? COLORS.WHITE
                : COLORS.GRAY_PRIMARY
            }
          >
            {children}
          </Body2.Regular400>
        </label>
        {tooltip && (
          <Tooltip
            className={styles.tooltip}
            label={tooltip.label}
            details={tooltip.details}
            placement={tooltip.placement || 'right'}
            popperBoxStyles={tooltip.popperBoxStyles || styles.popper}
            noLayout
          >
            <div className={styles.tooltipBody}>
              <InfoIcon className={styles.infoIcon} />
            </div>
          </Tooltip>
        )}
      </div>
      {getError(currentError, touched)}
    </>
  )
}
