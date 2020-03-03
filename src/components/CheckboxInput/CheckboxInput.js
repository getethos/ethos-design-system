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
      console.log('CheckboxInput useEffect -- calling doValidation')
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
            checked={isChecked}
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
  formTouched: PropTypes.bool,
  name: PropTypes.string.isRequired, // must be unique
  'data-tid': PropTypes.string.isRequired,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setFieldTouched: PropTypes.func,
  currentError: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  validator: PropTypes.func,
  formChangeHandler: PropTypes.func,
  facadeRenderer: PropTypes.func,
}
