import * as PropTypes from 'prop-types'
import * as React from 'react'
import useIncludes from '../../hooks/useIncludes.js'
import useInvalid from '../../hooks/useInvalid.js'
import { ArrowIconInline } from './ArrowIconInline'
import styles from './Button.module.scss'
type PrivateButtonProps = {
  ariaLabelId?: string
  role?: string
  'data-tid'?: string
  disabled?: boolean
  fullWidth?: boolean
  name?: string
  onClick?: (...args: any[]) => any
  isSelected?: boolean
  type?: any
  arrowIcon?: boolean
  backArrowIcon?: boolean
  size?: any
  style?: any
}
const HTML_TYPES = { BUTTON: 'button', SUBMIT: 'submit' } // read the docs^
const PUBLIC_PROPS = {
  ariaLabelId: PropTypes.string,
  role: PropTypes.string,
  children: PropTypes.node,
  'data-tid': PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(HTML_TYPES)),
  arrowIcon: PropTypes.bool,
  backArrowIcon: PropTypes.bool,
}
const SIZES = {
  // ***** ONLY USE SMALL IN UniversalNavbar! ***** //
  SMALL: 'Small',
  MEDIUM: 'Medium',
  UNSIZED: 'Unsized',
}
const STYLES = {
  BLACK: 'Black',
  BLACK_OUTLINE: 'BlackOutline',
  // WHITE: 'White', // TODO pending spec
  WHITE_OUTLINE: 'WhiteOutline',
  STATEFUL: 'Stateful',
  STATEFUL_WHITE: 'Stateful White',
  // For semantic <buttons> that are not styled as buttons:
  UNSTYLED: 'Unstyled',
  // Only used for CMS 'Check my price' CTA button on hero
  WHITE_CTA: 'WhiteCTA',
}
export const PrivateButton: React.SFC<PrivateButtonProps> & {
  HTML_TYPES: typeof HTML_TYPES
  PUBLIC_PROPS: typeof PUBLIC_PROPS
  SIZES: typeof SIZES
  STYLES: typeof STYLES
} = ({
  children,
  disabled,
  fullWidth,
  role,
  ariaLabelId,
  name,
  type = PrivateButton.HTML_TYPES.BUTTON,
  size,
  style,
  onClick,
  isSelected, // only used for Button.*.Stateful, aka SelectableHtmlButtonGroup
  arrowIcon,
  backArrowIcon,
  ...rest
}) => {
  // Verify that size, type, and style were valid enum values
  const [isLegalSize] = useIncludes(PrivateButton.SIZES)
  isLegalSize(size)
  const [isLegalType] = useIncludes(PrivateButton.HTML_TYPES)
  isLegalType(type)
  const [isLegalStyle] = useIncludes(PrivateButton.STYLES)
  isLegalStyle(style)
  // Verify that other required props were supplied
  const [, includesKeysOrThrow] = useIncludes(['data-tid'])
  includesKeysOrThrow(rest)
  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(Object.keys(PrivateButton.PUBLIC_PROPS))
  includesInvalid(rest)
  // Generate list of css classes
  // style may be 'Stateful White' so we need to split that
  const classNames = ['Button', size].concat(style.split(' '))
  if (fullWidth) classNames.push('fullWidth')
  if (isSelected) classNames.push('isSelected')
  if (arrowIcon || backArrowIcon) classNames.push('arrowIcon')
  let checked
  if (isSelected) {
    classNames.push('isSelected')
    checked = { 'aria-checked': isSelected }
  }
  const cssModulesClasses = classNames.reduce(
    (accumulator, klass, i) =>
      accumulator.concat(
        `${styles[klass]}${i < classNames.length - 1 ? ' ' : ''}`
      ),
    ''
  )
  return (
    <button
      {...checked}
      className={cssModulesClasses}
      disabled={disabled}
      type={type}
      name={name}
      onClick={onClick}
      data-tid={rest['data-tid']}
      role={role}
    >
      {backArrowIcon && <ArrowIconInline shouldFlip />}
      {ariaLabelId ? <span id={ariaLabelId}>{children}</span> : children}
      {arrowIcon && <ArrowIconInline />}
    </button>
  )
}
PrivateButton.HTML_TYPES = HTML_TYPES
PrivateButton.PUBLIC_PROPS = PUBLIC_PROPS
PrivateButton.SIZES = SIZES
PrivateButton.STYLES = STYLES
