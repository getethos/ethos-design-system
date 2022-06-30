import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CheckboxInput2 } from './CheckboxInput2'
import { InputLabel } from '../InputLabel'

export default function CheckboxGroup({
  className = '',
  options,
  onChange,
  formChangeHandler,
  allCaps = true,
  capitalize,
  name,
  initialValue = [],
  // currentError,
  // formTouched,
  // disabled,
  // validator,
  // required,
  labelCopy,
  // ...rest
}) {
  // let initialSelected
  // if (currentValue || typeof currentValue === 'boolean') {
  //   initialSelected = currentValue
  // } else if (initialValue || typeof initialValue === 'boolean') {
  //   initialSelected = initialValue
  // }

  const [selectedValues, setSelectedValues] = useState(initialValue)
  // const [isAnswered, setIsAnswered] = useState(false)
  // const resolvedValidator = validator ? validator : () => ''
  // const [getError, setError, , validate] = useErrorMessage(resolvedValidator)

  // const validationRadio = () => {
  //   let errorMessage = validate(selectedValue)
  //   errorMessage = errorMessage.length ? errorMessage : ''
  //   setError(errorMessage)
  //   if (formChangeHandler) {
  //     formChangeHandler(selectedValue, errorMessage)
  //   }
  // }
  useEffect(() => {
    if (onChange && selectedValues) {
      onChange({ value: selectedValues, isAnswered: selectedValues.length })
      formChangeHandler(formChangeHandler(selectedValues, ''))
      // validationRadio()
    }
  }, [selectedValues.length])

  // useEffect(() => {
  //   if (disabled) {
  //     setSelectedValues(undefined)
  //   }
  // }, [disabled])

  function onClickHandler(value, clickHandler) {
    return (evt) => {
      setSelectedValues([value])
      // if (!isAnswered) {
      //   setIsAnswered(true)
      // }
      return clickHandler && clickHandler(evt)
    }
  }

  // console.log(options)
  const finalOptions = options.map((o) => {
    const { value, onClick: passedHandler } = o
    // console.log(passedHandler)
    const checked = value === selectedValues
    const onClick = onClickHandler(value, passedHandler)
    return { ...o, checked, onClick, onChange }
  })

  // const handleBlur = () => {
  //   validationRadio()
  // }
  return (
    <fieldset className={className}>
      {labelCopy && (
        <legend>
          <InputLabel
            element="span"
            name={name}
            labelCopy={labelCopy}
            allCaps={allCaps}
            capitalize={capitalize}
          />
        </legend>
      )}
      {finalOptions.map((option) => (
        <CheckboxInput2
          {...option}
          key={`${option.label}-${option.value.toLowerCase()}`}
          id={option.id}
          name={`${name}-option`}
        >
          {option.label}
        </CheckboxInput2>
      ))}
    </fieldset>
  )
}

CheckboxGroup.propTypes = {
  /** name for radio group */
  name: PropTypes.string,
  className: PropTypes.string,
  /** label of radio group */
  labelCopy: PropTypes.string.isRequired,
  /** caps */
  allCaps: PropTypes.bool,
  // /** text transform capitalize label */
  capitalize: PropTypes.bool,
  // options: PropTypes.arrayOf(PropTypes.shape(RadioButton.propTypes)).isRequired,
  options: PropTypes.array.isRequired,
  initialValue: PropTypes.array.isRequired,
  formTouched: PropTypes.bool,
  currentValue: PropTypes.string,
  currentError: PropTypes.string,
  formChangeHandler: PropTypes.func,
  onChange: PropTypes.func,
  'data-tid': PropTypes.string,
  // validator: PropTypes.func,
  // disabled: PropTypes.bool,
  // required: PropTypes.bool,
  /** disabled radio group form */
  // disabed: PropTypes.bool,
}
