import React from 'react'
import PropTypes from 'prop-types'
import useIncludes from '../../hooks/useIncludes.js'
import useInvalid from '../../hooks/useInvalid.js'

import styles from './Button.module.scss'

/* @getethos/design-system/Button.js

   Legend:

   - `PrivateButton` is a private component that returns an element with CSS classes.
   - `Buttons.scss` (not imported here) implements those CSS classes.
   - `ButtonFactory` is a HOC that creates public components with correct props.
   - `<Button.Tiny.Blue>`, etc. are the set of Design-approved public buttons.
   ========================================================================== */

/**
 * `PrivateButton` is a private component that returns a <button> with CSS classes and
 * other HTML attributes like `disabled` and `type`.
 *
 * Note that it is ignorant of which combinations Design considers legal or
 * illegal. Legal combinations must be declared via the enumerated exports at
 * the end of this file.
 *
 * The public props (Button.PUBLIC_PROPS) may be passed in downstream.
 * Other props may only be specified in this file.
 *
 * `type` is important to understand because it determines whether the button
 * is a regular button or a form submission button (<button type="submit">).
 * https://developer.mozilla.org/en/docs/Web/HTML/Element/button
 *
 * @param  {String}   props.children    The button text to display
 * @param  {Boolean}  props.disabled    Whether the button is disabled
 * @param  {String}   props.type        <button type="button|submit">
 * @param  {String}   props.size        The size of the button.
 * @param  {String}   props.style       The color style of the button.
 * @param  {Boolean}  props.arrowIcon   Whether the arrow icon is displayed
 *                                      (behaves differently when fullWidth)
 * @param  {Boolean}  props.backArrowIcon   Back arrow icon
 */

function PrivateButton({
  children,
  disabled,
  fullWidth,
  role,
  ariaLabelId,
  name,
  type,
  size,
  style,
  onClick,
  isSelected, // only used for Button.*.Stateful, aka SelectableHtmlButtonGroup
  arrowIcon,
  backArrowIcon,
  ...rest
}) {
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
      {backArrowIcon && ArrowIconInline(true)}
      {ariaLabelId ? <span id={ariaLabelId}>{children}</span> : children}
      {arrowIcon && ArrowIconInline()}
    </button>
  )
}

const ArrowIconInline = (shouldFlip) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={
        shouldFlip ? styles.backArrowIconInline : styles.arrowIconInline
      }
    >
      <path
        d="M7.00016 0.333374L5.82516 1.50837L10.4752 6.16671H0.333496V7.83337H10.4752L5.82516 12.4917L7.00016 13.6667L13.6668 7.00004L7.00016 0.333374Z"
        fill="white"
      />
    </svg>
  )
}

PrivateButton.HTML_TYPES = { BUTTON: 'button', SUBMIT: 'submit' } // read the docs^

PrivateButton.PUBLIC_PROPS = {
  ariaLabelId: PropTypes.string,
  role: PropTypes.string,
  children: PropTypes.string,
  'data-tid': PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool, // only for Stateful style
  type: PropTypes.oneOf(Object.values(PrivateButton.HTML_TYPES)),
  arrowIcon: PropTypes.bool,
  backArrowIcon: PropTypes.bool,
}

PrivateButton.SIZES = {
  // ***** ONLY USE SMALL IN UniversalNavbar! ***** //
  SMALL: 'Small',
  MEDIUM: 'Medium',
  UNSIZED: 'Unsized',
}

PrivateButton.STYLES = {
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

PrivateButton.propTypes = {
  ...PrivateButton.PUBLIC_PROPS,
  size: PropTypes.oneOf(Object.values(PrivateButton.SIZES)),
  style: PropTypes.oneOf(Object.values(PrivateButton.STYLES)),
}

PrivateButton.defaultProps = { type: PrivateButton.HTML_TYPES.BUTTON }

function ButtonFactory(privateProps) {
  const PublicButtonComponent = (downstreamProps) => {
    return <PrivateButton {...downstreamProps} {...privateProps} />
  }

  return PublicButtonComponent
}

// TODO: We need to figure out a better way to compose these button styles
export const Button = {
  Medium: {
    Black: ButtonFactory({
      size: PrivateButton.SIZES.MEDIUM,
      style: PrivateButton.STYLES.BLACK,
    }),
    BlackOutline: ButtonFactory({
      size: PrivateButton.SIZES.MEDIUM,
      style: PrivateButton.STYLES.BLACK_OUTLINE,
    }),
    WhiteOutline: ButtonFactory({
      size: PrivateButton.SIZES.MEDIUM,
      style: PrivateButton.STYLES.WHITE_OUTLINE,
    }),
    Stateful: {
      Default: ButtonFactory({
        size: PrivateButton.SIZES.MEDIUM,
        style: PrivateButton.STYLES.STATEFUL,
      }),
      White: ButtonFactory({
        size: PrivateButton.SIZES.MEDIUM,
        style: PrivateButton.STYLES.STATEFUL_WHITE,
      }),
    },
  },
  // ***** ONLY USE SMALL IN UniversalNavbar! ***** //
  Small: {
    BlackOutline: ButtonFactory({
      size: PrivateButton.SIZES.SMALL,
      style: PrivateButton.STYLES.BLACK_OUTLINE,
    }),
  },
  Unstyled: ButtonFactory({
    size: PrivateButton.SIZES.UNSIZED,
    style: PrivateButton.STYLES.UNSTYLED,
  }),
  WhiteCTA: ButtonFactory({
    size: PrivateButton.SIZES.UNSIZED,
    style: PrivateButton.STYLES.WHITE_CTA,
  }),
}
