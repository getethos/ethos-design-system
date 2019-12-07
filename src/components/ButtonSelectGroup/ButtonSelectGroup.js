import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import useErrorMessage from '../../hooks/useErrorMessage.js'
import { OptionButton } from './OptionButton'
import { InputLabel } from '../InputLabel'

import styles from './ButtonGroup.module.scss'

/**
 **/

/**
 * Component renders a group of button that behaves similarly to a radio group
 *
 * @public
 *
 * @param {object} props - Component Props
 * @prop {string} props.name - Name of field. default value is a uuid
 * @prop {string} props.labelCopy - Set's the caption of the group's label
 * @prop {string} [props.initialValue] - Optionally sets a default value for the group. If set, the matching option will be set as `isSelected`
 * @prop {string} [props.buttonStyle] - Optional value that sets the background color of all the buttons in the group (unselected state)
 * @prop {function} [props.onSelect] - Optional callback thats fires when an option is selected. returns an object containing the selected `value` and a boolean value `isAnswered`
 * @prop {function} [props.formChangeHandler] - Optional callback thats fires when an option is selected. Works similarly to onSelect, but used in `<Form>`.
 *
 * @example ```
 * <ButtonSelectGroup
 *  initialValue="excellent"
 *  labelCopy="Health"
 *  onSelect={({ value }) => console.log(value)}
 * >
 *   <ButtonSelectGroup.Option value="average">Average</ButtonSelectGroup.Option>
 *   <ButtonSelectGroup.Option value="great">Greate</ButtonSelectGroup.Option>
 * </ButtonSelectGroup>
 * ```
 *
 * @return {JSX.Element}
 */
export const ButtonSelectGroup = ({
  labelCopy,
  children,
  initialValue = undefined,
  currentValue,
  currentError,
  formTouched,
  onSelect,
  column,
  formChangeHandler,
  name = `button-select-group-${uuidv4()}`,
  allCaps = true,
  buttonStyle = 'default',
  validator,
  fullWidth = true,
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
  // Set up validation hooks
  const [getError, setError, , validate] = useErrorMessage(validator)

  useEffect(() => {
    // `isSelectedValue` allows `false` to work properly and validate
    // For example, if we have two buttons yes & no mapped to booleans
    const isSelectedValue = typeof selectedValue !== 'undefined'
    if (onSelect && isSelectedValue) {
      onSelect({ value: selectedValue, isAnswered })
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

  /**
   * Handles a click event on an descending `<OptionButton/>`
   *
   * @private
   *
   * @param {string} value - the new selected value
   * @param {function} clickHandler - an optional click handler that fires are the value has been set
   *
   * @return {function}
   */
  function onClickHandler(value, clickHandler) {
    return (evt) => {
      // set the selected value to the passed value
      setSelectedValue(value)

      // if the group was not previously answered – set it to true
      if (!isAnswered) {
        setIsAnswered(true)
      }

      return clickHandler && clickHandler(evt)
    }
  }

  // Iterate through each child, inject stateful props
  const options = React.Children.map(children, (child) => {
    const { value, onClick: passedHandler } = child.props

    const isSelected = value === selectedValue
    const onClick = onClickHandler(value, passedHandler)

    return React.cloneElement(child, {
      ...child.props,
      isSelected,
      onClick,
      buttonStyle,
    })
  })

  const optionsContainerClassNames = [styles.buttonGroup]
  if (fullWidth) optionsContainerClassNames.push(styles.fullWidth)
  if (column) optionsContainerClassNames.push(styles.column)

  // Use id to connect label and this pseudo-input because of aria-labelledby
  return (
    <>
      <div
        role="radiogroup"
        aria-labelledby={name}
        className="button-select-group"
        data-tid={rest['data-tid']}
      >
        <InputLabel
          element="span"
          id={name}
          labelCopy={labelCopy}
          allCaps={allCaps}
        />
        <div className={optionsContainerClassNames.join(' ')}>{options}</div>
      </div>
      {getError(currentError, formTouched)}
    </>
  )
}

ButtonSelectGroup.propTypes = {
  formTouched: PropTypes.bool,
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  currentError: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  /** Set's the caption of the group's label */
  labelCopy: PropTypes.string.isRequired,
  /** Name of the field, provided a uuid if not supplied. */
  name: PropTypes.string,
  /** When set to `true`, the group's label will be displayed uppercase */
  allCaps: PropTypes.bool,
  /** Optionally sets a default value for the group. If set, the matching option will be set as `isSelected` */
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Optional value that sets the background color of all the buttons in the group (unselected state) */
  buttonStyle: PropTypes.string,
  /** Optional callback thats fires when an option is selected. returns an object containing the selected `value` and a boolean value `isAnswered` */
  formChangeHandler: PropTypes.func,
  /** Optional callback thats fires when an option is selected. Works similarly to onSelect, but used in `<Form>`. */
  onSelect: PropTypes.func,
  /** When set to `true`, the group will display as flex column */
  column: PropTypes.bool,
  /** Optional data-tid used as a unique id for targeting test selectors */
  'data-tid': PropTypes.string,
  validator: PropTypes.func,
  /** Optional, makes the group width 100%. Defaults to true */
  fullWidth: PropTypes.bool,
}

// Export the option button
ButtonSelectGroup.Option = OptionButton
