import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { COLORS } from '../Colors.js'
import { Body2 } from '../Body2.js'
import { InfoIcon } from './InfoIcon.js'
import { Tooltip } from '../Tooltip/Tooltip.js'
import useErrorMessage from '../../hooks/useErrorMessage.js'
import useInputValidation from '../../hooks/useInputValidation.js'
import { codes } from '../../helpers/constants.js'
import { Facade } from '../CheckboxInput/Facade.js'
import styles from '../CheckboxInput/CheckboxInput.module.scss'
import errorStyles from '../Errors.module.scss'

export const CheckboxInput2 = ({
  formChangeHandler,
  validator,
  children,
  disabled,
  name,
  id,
  initialValue,
  currentValue,
  currentError,
  setFieldTouched,
  // TODO: pushed in from Form.js but not used here
  formTouched, // eslint-disable-line no-unused-vars
  checked,
  tooltip,
  variant = 'default',
  facadeRenderer,
  dataFormotiv = '',
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
    const className = getFacadeClasses()
    if (facadeRenderer) {
      return facadeRenderer({ className, isChecked })
    } else {
      return <Facade className={className} />
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
          htmlFor={id || name}
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
              data-formotiv={dataFormotiv}
              onKeyPress={onKeyPress}
              disabled={disabled}
              checked={resolvedIsChecked}
              id={id || name}
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

CheckboxInput2.propTypes = {
  /** low level prop used only by the form engine */
  formTouched: PropTypes.bool,
  /** Name of the field */
  name: PropTypes.string.isRequired,
  /** ID of the field */
  id: PropTypes.string.isRequired,
  /** Required data-tid used as a unique id for targeting test selectors */
  'data-tid': PropTypes.string.isRequired,
  /** data sent to formotiv used for behavioral analysis */
  dataFormotiv: PropTypes.string,
  /** Optionally sets a default value for the checkbox */
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Allows for brute force setting of whether checked or not. Usually,
   * you should let the component manage this itself, but this may be
   * useful if you need to set the checked state programatically */
  checked: PropTypes.bool,
  /** currentValue is a low level prop used only by the form engine */
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** setFieldTouched is a low level prop used only by the form engine */
  setFieldTouched: PropTypes.func,
  /** currentError is a low level prop used only by the form engine */
  currentError: PropTypes.string,
  /** formChangeHandler is a low level prop used only by the form engine */
  formChangeHandler: PropTypes.func,
  /** The Accordion's children. Likely AccordionSection's */
  children: PropTypes.node.isRequired,
  /** `disabled` - whether to disable the the checkbox */
  disabled: PropTypes.bool,
  /** field validation callback */
  validator: PropTypes.func,
  /** only useful if you need to completely override the checkbox facade e.g
   * NoraCheckboxInput does this */
  facadeRenderer: PropTypes.func,
  /** Toolip props */
  tooltip: PropTypes.object,
  /** Variants of default | textonly */
  variant: PropTypes.oneOf(['default', 'textonly']),
}
