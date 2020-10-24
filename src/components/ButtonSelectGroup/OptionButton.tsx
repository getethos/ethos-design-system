import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../Button'
export const OPTION_BUTTON_STYLES = {
  DEFAULT: 'default',
  WHITE: 'white',
}
export type OptionButtonProps = {
  buttonStyle?: any
  label?: string
  isSelected?: boolean
  onClick?: (...args: any[]) => any
  'data-tid'?: string
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
export const OptionButton: React.FC<OptionButtonProps> = ({
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
    case OPTION_BUTTON_STYLES.DEFAULT:
    default:
      return (
        <Button.Medium.Stateful.Default {...props}>
          {label}
        </Button.Medium.Stateful.Default>
      )
  }
}
