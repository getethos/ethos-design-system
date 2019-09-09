import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import { OptionGroup } from './OptionGroup'
import { OptionButton } from './OptionButton'
import { Body } from '../Type/Body'
import { COLORS } from '../Colors'
import './ButtonGroup.scss'

/**
 * @param {string} props.label - The button group's label
 */
export const ButtonSelectGroup = ({
  label,
  allCaps,
  children,
  onSelect,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  const [isAnswered, setIsAnswered] = useState(false)

  useEffect(() => {
    if (onSelect && selectedValue) {
      onSelect({ value: selectedValue, isAnswered })
    }
  }, [selectedValue])

  function onSelectHandler(value) {
    // set the selected value to the passed value
    setSelectedValue(value)

    // if the group was not previously answered – set it to true
    if (!isAnswered) {
      setIsAnswered(true)
    }
  }

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
      <OptionGroup
        selectedValue={selectedValue}
        onSelectHandler={onSelectHandler}
      >
        {children}
      </OptionGroup>
    </div>
  )
}

ButtonSelectGroup.propTypes = {
  /** Set's the caption of the label for the group */
  label: PropTypes.string,
  /** When set to `true`, the group's label will be displayed uppercase */
  allCaps: PropTypes.bool,
  /** Optional callback thats fires when an option is selected. returns an object containing the selected `value` and a boolean value `isAnswered` */
  onSelect: PropTypes.func,
  /** Optionally sets a default value for the group. If set, the matching option will be set as `isSelected */
  defaultValue: PropTypes.string,
}

ButtonSelectGroup.Option = OptionButton
