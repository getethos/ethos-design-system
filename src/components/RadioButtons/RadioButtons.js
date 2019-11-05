import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import useErrorMessage from '../../hooks/useErrorMessage.js'
import useIncludes from '../../hooks/useIncludes.js'
import useInvalid from '../../hooks/useInvalid.js'

import { Body } from '../Type/Body.js'
import { COLORS } from '../Colors.js'
import styles from './RadioButtons.module.scss'

function RadioButton({ name, checked, required, disabled, label, ...rest }) {
  const [, includesKeysOrThrow] = useIncludes(['name', 'label'])
  includesKeysOrThrow({ name, label })
  const [includesInvalid] = useInvalid(Object.keys(RadioButton.propTypes))
  includesInvalid(rest)

  return (
    <label className={styles.RadioButton}>
      <span>
        <input
          type="radio"
          name={name}
          checked={checked}
          required={required}
          disabled={disabled}
          data-tid={rest['data-tid']}
          {...rest}
        />
        <aside />
      </span>
      <Body.Regular400 color={COLORS.GRAY_PRIMARY}>{label}</Body.Regular400>
    </label>
  )
}

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.node.isRequired,
  'data-tid': PropTypes.string,
  onClick: PropTypes.func,

  // These will appear if RadioButtonGroup is used with redux-form:
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onFocus: PropTypes.func,
}

export function RadioButtonGroup({
  options,
  onChange,
  formChangeHandler,
  name = `radio-button-group-${uuidv4()}`,
  initialValue = undefined,
  currentValue,
  currentError,
  formTouched,
  disabled,
  validator,
  required,
  ...rest
}) {
  let initialSelected
  if (currentValue || typeof currentValue === 'boolean') {
    initialSelected = currentValue
  } else if (initialValue || typeof initialValue === 'boolean') {
    initialSelected = initialValue
  }

  const [selectedValue, setSelectedValue] = useState(initialSelected)
  const [isAnswered, setIsAnswered] = useState(false)
  const resolvedValidator = validator ? validator : () => ''
  const [getError, setError, , validate] = useErrorMessage(resolvedValidator)

  useEffect(() => {
    const isSelectedValue = typeof selectedValue !== 'undefined'
    if (onChange && isSelectedValue) {
      onChange({ value: selectedValue, isAnswered })
    }
    if (formChangeHandler && isSelectedValue) {
      // Ensure all validators get called
      let errorMessage = validate(selectedValue)
      errorMessage = errorMessage.length ? errorMessage : ''
      setError(errorMessage)

      // Update form with the new value and a falsy error message
      formChangeHandler(selectedValue, errorMessage)
    }
  }, [selectedValue, isAnswered])

  function onClickHandler(value, clickHandler) {
    return (evt) => {
      setSelectedValue(value)
      if (!isAnswered) {
        setIsAnswered(true)
      }
      return clickHandler && clickHandler(evt)
    }
  }

  const finalOptions = options.map((o) => {
    const { value, onClick: passedHandler } = o
    const checked = value === selectedValue
    const onClick = onClickHandler(value, passedHandler)
    return { ...o, name, checked, onClick, onChange }
  })

  return (
    <fieldset
      role="radiogroup"
      className={styles.RadioButtonGroup}
      data-tid={rest['data-tid']}
      aria-labelledby={name}
    >
      {finalOptions.map((option) => (
        <RadioButton
          {...option}
          disabled={disabled || option.disabled}
          required={required}
          key={`${option.label}-${option.value.toLowerCase()}`}
          {...rest}
        />
      ))}
      {getError(currentError, formTouched)}
    </fieldset>
  )
}

RadioButtonGroup.PUBLIC_PROPS = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape(RadioButton.propTypes)).isRequired,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  formTouched: PropTypes.bool,
  currentValue: PropTypes.string,
  currentError: PropTypes.string,
  formChangeHandler: PropTypes.func,
  onChange: PropTypes.func,
  'data-tid': PropTypes.string,
  validator: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
}

RadioButtonGroup.propTypes = {
  ...RadioButtonGroup.PUBLIC_PROPS,
}
