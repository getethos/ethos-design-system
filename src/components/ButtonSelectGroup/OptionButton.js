import React from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import { Button } from '../Button'

/**
 * Component renders an option button within a `<ButtonSelectGroup />`
 *
 * @private
 *
 * @param {object} props - Component Props
 * @param {string} props.label - the option's label
 * @param {boolean} props.isSelected - determines if the option is currently selected
 * @param {function} [props.onClick] - The value of the option
 *
 * @return {JSX.Element}
 */
export const OptionButton = ({ children: label, isSelected, onClick }) => (
  <Button.Medium.Stateful
    ariaLabelId={`selection-option-${uuidv4()}`}
    role="radio"
    onClick={onClick}
    isSelected={isSelected}
  >
    {label}
  </Button.Medium.Stateful>
)

OptionButton.propTypes = {
  /** Set's the caption of the button's label */
  label: PropTypes.string,
  /** When set to `true`, the button will display as `selected` */
  isSelected: PropTypes.bool,
  /** An optional onClick handler that fires **after** an option has been selected */
  onClick: PropTypes.func,
}
