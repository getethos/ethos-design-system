import React from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import { Button } from '../Button'

/**
 * Component renders an option button within a `<ButtonSelectGroup />`
 *
 * @private
 *
 * @param {string} props.label - the option's label
 * @param {boolean} props.isSelected - determines if the option is currently selected
 * @param {function} [props.onClick]
 *
 * @return {JSX.Element}
 */
export const OptionButton = ({ children: label, isSelected, onClick }) => {
  return (
    <Button.Medium.Stateful
      ariaLabelId={`selection-option-${uuidv4()}`}
      role="radio"
      onClick={onClick}
      isSelected={isSelected}
    >
      {label}
    </Button.Medium.Stateful>
  )
}

OptionButton.propTypes = {
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string.isRequired,
}
