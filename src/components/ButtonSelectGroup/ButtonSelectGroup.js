import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import { OptionButton } from './OptionButton'
import { Body } from '../Type/Body'
import { COLORS } from '../Colors'
import './ButtonGroup.scss'

/**
 **/

/**
 * Component renders a group of button that behaves similarly to a radio group
 *
 * @public
 *
 * @param {object} props - Component Props
 * @prop {string} props.label - Set's the caption of the group's label
 * @prop {boolean} [props.allCaps=false] - When set to `true`, the group's label will be displayed in all caps
 * @prop {string} [props.defaultValue] - Optionally sets a default value for the group. If set, the matching option will be set as `isSelected`
 * @prop {function} [props.onSelect] - Optional callback thats fires when an option is selected. returns an object containing the selected `value` and a boolean value `isAnswered`
 *
 * @example ```
 * <ButtonSelectGroup
 *  defaultValue="excellent"
 *  label="Health"
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
  label,
  allCaps = false,
  children,
  defaultValue,
  onSelect,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  const [isAnswered, setIsAnswered] = useState(false)

  useEffect(() => {
    if (onSelect && selectedValue) {
      onSelect({ value: selectedValue, isAnswered })
    }
  }, [selectedValue])

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

    return React.cloneElement(child, { ...child.props, isSelected, onClick })
  })

  const labelId = `button-select-group-${uuidv4()}`
  return (
    <div
      role="radiogroup"
      aria-labelledby={labelId}
      className="button-select-group"
    >
      <Body.Regular400
        element="span"
        color={COLORS.GRAY_PRIMARY}
        allCaps={allCaps}
      >
        <span id={labelId} className="button-group-label">
          {label}
        </span>
      </Body.Regular400>
      <div className="button-group">{options}</div>
    </div>
  )
}

ButtonSelectGroup.propTypes = {
  /** Set's the caption of the group's label */
  label: PropTypes.string.isRequired,
  /** When set to `true`, the group's label will be displayed uppercase */
  allCaps: PropTypes.bool,
  /** Optional callback thats fires when an option is selected. returns an object containing the selected `value` and a boolean value `isAnswered` */
  onSelect: PropTypes.func,
  /** Optionally sets a default value for the group. If set, the matching option will be set as `isSelected` */
  defaultValue: PropTypes.string,
}

// Export the option button
ButtonSelectGroup.Option = OptionButton
