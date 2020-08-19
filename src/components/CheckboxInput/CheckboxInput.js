import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { COLORS } from '../Colors.js'
import { Body } from '../Body.js'
import useErrorMessage from '../../hooks/useErrorMessage.js'
import useInputValidation from '../../hooks/useInputValidation.js'
import { codes } from '../../helpers/constants.js'
import { Facade } from './Facade.js'
import styles from './CheckboxInput.module.scss'
import errorStyles from '../Errors.module.scss'

export const CheckboxInput = ({
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
            checked={resolvedIsChecked}
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

CheckboxInput.propTypes = {
  /** low level prop used only by the form engine */
  formTouched: PropTypes.bool,
  /** Name of the field */
  name: PropTypes.string.isRequired,
  /** Required data-tid used as a unique id for targeting test selectors */
  'data-tid': PropTypes.string.isRequired,
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
  /** whether to display label in all caps */
  allCaps: PropTypes.bool,
  /** text transform capitalize label */
  capitalize: PropTypes.bool,
  /** field validation callback */
  validator: PropTypes.func,
  /** only useful if you need to completely override the checkbox facade e.g
   * NoraCheckboxInput does this */
  facadeRenderer: PropTypes.func,
}
