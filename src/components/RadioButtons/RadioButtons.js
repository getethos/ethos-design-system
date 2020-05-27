import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

import useErrorMessage from '../../hooks/useErrorMessage.js'
import useIncludes from '../../hooks/useIncludes.js'
import useInvalid from '../../hooks/useInvalid.js'
import { InputLabel } from '../InputLabel'
import { Body } from '../Body.js'
import { COLORS } from '../Colors.js'
import { codes } from '../../helpers/constants.js'
import styles from './RadioButtons.module.scss'

// Wrapping this way facilitates spying with spyOn
export const focusHelper = {
  focus: (elementRef) => {
    elementRef.current.focus()
  },
}

function RadioButton({
  name,
  value,
  checked,
  tabIndex,
  required,
  disabled,
  label,
  onClick,
  onChange,
  ...rest
}) {
  const [, includesKeysOrThrow] = useIncludes(['name', 'label'])
  includesKeysOrThrow({ name, label })
  const [includesInvalid] = useInvalid(Object.keys(RadioButton.propTypes))
  includesInvalid(rest)

  const spanRadio = useRef(null)

  // This allows the user to arrow navigate within radio group preserving focus affordance
  useEffect(() => {
    if (checked) {
      focusHelper.focus(spanRadio)
    }
  }, [checked])

  return (
    <label className={styles.RadioButton}>
      <span
        role="radio"
        ref={spanRadio}
        value={value}
        aria-checked={checked}
        tabIndex={tabIndex}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onClick={onClick}
          onChange={onChange}
          required={required}
          disabled={disabled}
          data-tid={rest['data-tid']}
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
  tabIndex: PropTypes.number,
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
  allCaps = true,
  name = `radio-button-group-${uuidv4()}`,
  initialValue = undefined,
  currentValue,
  currentError,
  formTouched,
  disabled,
  validator,
  required,
  labelCopy,
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

  const validationRadio = () => {
    let errorMessage = validate(selectedValue)
    errorMessage = errorMessage.length ? errorMessage : ''
    setError(errorMessage)
    if (formChangeHandler) {
      formChangeHandler(selectedValue, errorMessage)
    }
  }
  useEffect(() => {
    const isSelectedValue = typeof selectedValue !== 'undefined'
    if (onChange && isSelectedValue) {
      onChange({ value: selectedValue, isAnswered })
      validationRadio()
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

  let hasChecked = false
  const allRadioValues = []
  const finalOptions = options.map((o) => {
    const { value, onClick: passedHandler } = o
    allRadioValues.push(value)
    const checked = value === selectedValue
    // Keeps track of whether or not we have any radio checked
    if (checked) {
      hasChecked = true
    }
    const onClick = onClickHandler(value, passedHandler)
    return { ...o, name, checked, onClick, onChange }
  })

  const handleBlur = () => {
    validationRadio()
  }

  // This key handling essentially allows us to comply with the spec. See their example:
  // https://www.w3.org/TR/wai-aria-practices/examples/radio/radio-1/js/radioGroup.js
  // And Jared Palmer's React version which he obviously referenced w3's example:
  // https://github.com/palmerhq/radio-group/blob/master/src/index.tsx#L92
  const handleKeyDown = React.useCallback(
    (event) => {
      const last = allRadioValues.length - 1
      const index = allRadioValues.findIndex((i) => i == selectedValue)
      event.persist()
      let keyActedOn = false
      function setPrevious() {
        if (index === 0) {
          setSelectedValue(allRadioValues[last])
        } else {
          setSelectedValue(allRadioValues[index - 1])
        }
      }

      function setNext() {
        if (index === last) {
          setSelectedValue(allRadioValues[0])
        } else {
          setSelectedValue(allRadioValues[index + 1])
        }
      }

      const newValue = event.target.getAttribute('value')

      switch (event.keyCode) {
        case codes.SPACE:
        case codes.RETURN:
          // If on span or input with the radio value
          if (newValue) {
            setSelectedValue(newValue)
          }
          keyActedOn = true
          break
        case codes.UP:
        case codes.LEFT:
          setPrevious()
          keyActedOn = true
          break
        case codes.DOWN:
        case codes.RIGHT:
          setNext()
          keyActedOn = true
          break
        default:
          break
      }

      if (keyActedOn) {
        event.stopPropagation()
        event.preventDefault()
      }
    },
    [allRadioValues, selectedValue]
  )

  return (
    <fieldset
      role="radiogroup"
      className={styles.RadioButtonGroup}
      data-tid={rest['data-tid']}
      aria-labelledby={name}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <InputLabel
        element="span"
        id={name}
        labelCopy={labelCopy}
        allCaps={allCaps}
      />
      {finalOptions.map((option, i) => {
        // Setting tabindex to 0 means that this radio item will be what's
        // tabbed into before needing to use arrow keys to further navigate
        // the radio button group. There are basically two cases:
        // 1. nothing is check -- set first item to 0 per the spec
        // 2. a radio has been selected -- set it to 0 so we tab directly to it
        const tabIndexValue =
          option.checked || (i === 0 && !hasChecked) ? 0 : -1

        return (
          <RadioButton
            {...option}
            tabIndex={tabIndexValue}
            disabled={disabled || option.disabled}
            required={required}
            key={`${option.label}-${option.value.toLowerCase()}`}
          />
        )
      })}
      {getError(currentError, formTouched)}
    </fieldset>
  )
}

RadioButtonGroup.PUBLIC_PROPS = {
  name: PropTypes.string,
  labelCopy: PropTypes.string.isRequired,
  allCaps: PropTypes.bool,
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
