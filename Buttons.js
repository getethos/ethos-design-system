import React from 'react'
import PropTypes from 'prop-types'

/* @getethos/design-system/Buttons.js

   Legend:

   - `Button` is a private component that returns an element with CSS classes.
   - `Buttons.scss` (not imported here) implements those CSS classes.
   - `ButtonFactory` is a HOC that creates public components with correct props.
   - `<Button.Tiny.Blue>`, etc. are the set of Design-approved public buttons.
   ========================================================================== */

/**
 * `Button` is a private component that returns a <button> with CSS classes and
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
 * @param  {String}   props.children  The button text to display
 * @param  {Boolean}  props.disabled  Whether the button is disabled
 * @param  {String}   props.type      <button type="button|submit">
 * @param  {String}   props.size      The size of the button.
 * @param  {String}   props.style     The color style of the button.
 */
function Button({
  children,
  disabled,
  fullWidth,
  name,
  type,
  size,
  style,
  onClick,
  isSelected, // only used for Button.*.Stateful, aka SelectableHtmlButtonGroup
  ...rest
}) {
  const isValidHtmlType = Object.values(Button.HTML_TYPES).includes(type)
  const isValidSize = Object.values(Button.SIZES).includes(size)
  const isValidStyle = Object.values(Button.STYLES).includes(style)
  // Hyphenated attrs are a little annoying to work with in React.
  const unexpected = Object.keys(rest).filter((k) => !['data-tid'].includes(k))
  const unexpectedProp = unexpected[0]
  if (!isValidHtmlType) throw new TypeError(`Invalid HTML type '${type}'.`)
  if (!isValidSize) throw new TypeError(`Invalid size '${size}'.`)
  if (!isValidStyle) throw new TypeError(`Invalid style '${style}'.`)
  if (unexpectedProp) throw new TypeError(`Unexpected prop '${unexpectedProp}'`)

  const classNames = ['Button', size, style]
  if (fullWidth) classNames.push('fullWidth')
  if (isSelected) classNames.push('isSelected')

  return (
    <button
      className={classNames.join(' ')}
      disabled={disabled}
      type={type}
      name={name}
      onClick={onClick}
      data-tid={rest['data-tid']}
    >
      {children}
    </button>
  )
}

Button.HTML_TYPES = { BUTTON: 'button', SUBMIT: 'submit' } // read the docs^

Button.PUBLIC_PROPS = {
  children: PropTypes.string,
  'data-tid': PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool, // only for Stateful style
  type: PropTypes.oneOf(Object.values(Button.HTML_TYPES)),
}

Button.SIZES = {
  SMALL: 'Small',
  MEDIUM: 'Medium',
  UNSIZED: 'Unsized',
}

Button.STYLES = {
  BLACK: 'Black',
  BLACK_OUTLINE: 'BlackOutline',
  // WHITE: 'White', // TODO pending spec
  WHITE_OUTLINE: 'WhiteOutline',
  STATEFUL: 'Stateful',

  // For semantic <buttons> that are not styled as buttons:
  UNSTYLED: 'Unstyled',
}

Button.propTypes = {
  ...Button.PUBLIC_PROPS,
  size: PropTypes.oneOf(Object.values(Button.SIZES)),
  style: PropTypes.oneOf(Object.values(Button.STYLES)),
}

Button.defaultProps = { type: Button.HTML_TYPES.BUTTON }

function ButtonFactory(privateProps) {
  function throwIllegalProp(prop) {
    const isIllegal = !Object.keys(Button.PUBLIC_PROPS).includes(prop)
    if (isIllegal) throw new TypeError(`Illegal prop '${prop}'`)
  }

  const PublicButtonComponent = (downstreamProps) => {
    Object.keys(downstreamProps).forEach(throwIllegalProp)
    return <Button {...downstreamProps} {...privateProps} />
  }

  return PublicButtonComponent
}

const PublicButtonComponents = {
  Medium: {
    Black: ButtonFactory({
      size: Button.SIZES.MEDIUM,
      style: Button.STYLES.BLACK,
    }),
    BlackOutline: ButtonFactory({
      size: Button.SIZES.MEDIUM,
      style: Button.STYLES.BLACK_OUTLINE,
    }),
    WhiteOutline: ButtonFactory({
      size: Button.SIZES.MEDIUM,
      style: Button.STYLES.WHITE_OUTLINE,
    }),
    Stateful: ButtonFactory({
      size: Button.SIZES.MEDIUM,
      style: Button.STYLES.STATEFUL,
    }),
  },
  Small: {
    Stateful: ButtonFactory({
      size: Button.SIZES.SMALL,
      style: Button.STYLES.STATEFUL,
    }),
  },
  Unstyled: ButtonFactory({
    size: Button.SIZES.UNSIZED,
    style: Button.STYLES.UNSTYLED,
  }),
}

export { PublicButtonComponents as Button }
