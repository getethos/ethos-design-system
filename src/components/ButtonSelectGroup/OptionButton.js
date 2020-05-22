import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../Button'

export const OPTION_BUTTON_STYLES = {
  DEFAULT: 'default',
  WHITE: 'white',
}

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
export const OptionButton = ({
  children: label,
  isSelected,
  onClick,
  buttonStyle,
}) => {
  const props = {
    ariaLabelId: `selection-option-${uuidv4()}`,
    role: 'radio',
    onClick: onClick,
    isSelected: isSelected,
  }

  switch (buttonStyle) {
    case OPTION_BUTTON_STYLES.WHITE:
      return (
        <Button.Medium.Stateful.White {...props}>
          {label}
        </Button.Medium.Stateful.White>
      )

    case OPTION_BUTTON_STYLES.DEFAULT:
    default:
      return (
        <Button.Medium.Stateful.Default {...props}>
          {label}
        </Button.Medium.Stateful.Default>
      )
  }
}

OptionButton.propTypes = {
  children: PropTypes.string.isRequired,
  buttonStyle: PropTypes.oneOf(Object.values(OPTION_BUTTON_STYLES)),
  /** Set's the caption of the button's label */
  label: PropTypes.string,
  /** When set to `true`, the button will display as `selected` */
  isSelected: PropTypes.bool,
  /** An optional onClick handler that fires **after** an option has been selected */
  onClick: PropTypes.func,
}
