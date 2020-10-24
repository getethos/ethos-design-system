import * as React from 'react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { codes } from '../../helpers/constants.js'
import useErrorMessage from '../../hooks/useErrorMessage'
import { PublicFormProps } from '../Form/Form'
import { InputLabel } from '../InputLabel'
import { RadioButton } from './RadioButton'
import styles from './RadioButtons.module.scss'

type RadioButtonGroupProps = PublicFormProps & {
  labelCopy: string
  allCaps?: boolean
  capitalize?: boolean
  options: any[]
  initialValue?: string | boolean
  currentValue?: string
  currentError?: string
  onChange?: (...args: any[]) => any
  disabled?: boolean
  required?: boolean
}
export const RadioButtonGroup: React.SFC<RadioButtonGroupProps> = ({
  options,
  onChange,
  formChangeHandler,
  allCaps = true,
  capitalize,
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
}) => {
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
    errorMessage =
      (typeof errorMessage === 'string' || Array.isArray(errorMessage)) &&
      errorMessage.length
        ? errorMessage
        : ''
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
  const allRadioValues: any[] = []
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
        capitalize={capitalize}
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
