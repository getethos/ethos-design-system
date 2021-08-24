import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../Button'

export const OPTION_BUTTON_STYLES = {
  DEFAULT: 'default',
  WHITE: 'white',
  UNSTYLED: 'unstyled',
  FLOATING: 'floating',
}

/**
 * Component renders an option button within a `<ButtonSelectGroup />`
 *
 * @private
 *
 * @param {object} props - Component Props
 * @param {string} props.children: label - the option's label
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
  'data-tid': dataTid,
}) => {
  const props = {
    ariaLabelId: `selection-option-${uuidv4()}`,
    role: 'radio',
    onClick: onClick,
    isSelected: isSelected,
    'data-tid': dataTid,
  }

  switch (buttonStyle) {
    case OPTION_BUTTON_STYLES.WHITE:
      return (
        <Button.Medium.Stateful.White {...props}>
          {label}
        </Button.Medium.Stateful.White>
      )

    case OPTION_BUTTON_STYLES.FLOATING:
      return (
        <Button.Medium.Stateful.Floating {...props}>
          {label}
        </Button.Medium.Stateful.Floating>
      )

    case OPTION_BUTTON_STYLES.DEFAULT:
    default:
      return (
        <Button.Medium.Stateful.Default {...props}>
          {label}
        </Button.Medium.Stateful.Default>
      )

    case OPTION_BUTTON_STYLES.UNSTYLED:
      return <Button.Unstyled {...props}>{label}</Button.Unstyled>
  }
}

OptionButton.propTypes = {
  /** Sets the caption of the button's label */
  children: PropTypes.string.isRequired,
  buttonStyle: PropTypes.oneOf(Object.values(OPTION_BUTTON_STYLES)),
  /** When set to `true`, the button will display as `selected` */
  isSelected: PropTypes.bool,
  /** An optional onClick handler that fires **after** an option has been selected */
  onClick: PropTypes.func,
  'data-tid': PropTypes.string,
}
