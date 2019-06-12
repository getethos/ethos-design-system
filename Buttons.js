import React from 'react'
import PropTypes from 'prop-types'

/* @getethos/design-system/Buttons.js

   Legend:

   - `Button` is a private component that returns an element with CSS classes.
   - `Button.scss` (not imported here) implements those CSS classes.
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
function Button({ children, disabled, type, size, style, ...unexpectedProps }) {
  const isValidHtmlType = Object.values(Button.HTML_TYPES).includes(type)
  const isValidSize = Object.values(Button.SIZES).includes(size)
  const isValidStyle = Object.values(Button.STYLES).includes(style)
  const unexpectedProp = Object.keys(unexpectedProps)[0]
  if (!isValidHtmlType) throw new TypeError(`Invalid HTML type '${type}'.`)
  if (!isValidSize) throw new TypeError(`Invalid size '${size}'.`)
  if (!isValidStyle) throw new TypeError(`Invalid style '${style}'.`)
  if (unexpectedProp) throw new TypeError(`Unexpected prop '${unexpectedProp}'`)

  return (
    <button
      className={['Button', size, style].join(' ')}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

Button.HTML_TYPES = { BUTTON: 'button', SUBMIT: 'submit' } // read the docs^

Button.PUBLIC_PROPS = {
  children: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(Button.HTML_TYPES)),
}

Button.SIZES = {
  LARGE: 'Large',
  MEDIUM: 'Medium',
  SMALL: 'Small',
  TINY: 'Tiny',
}

Button.STYLES = {
  BLUE: 'Blue',
  YELLOW: 'Yellow',
  WHITE: 'White',
  BLACK_OUTLINE: 'BlackOutline',
  BLUE_OUTLINE: 'BlueOutline',
  // TODO: StatefulButton, which is a distinct visual style plus nonstandard
  // functionality. The functionality will probably mean it's a new component,
  // and perhaps this file is just responsible for the markup/styles.
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
  Large: {
    Blue: ButtonFactory({
      size: Button.SIZES.LARGE,
      style: Button.STYLES.BLUE,
    }),
    Yellow: ButtonFactory({
      size: Button.SIZES.LARGE,
      style: Button.STYLES.YELLOW,
    }),
    White: ButtonFactory({
      size: Button.SIZES.LARGE,
      style: Button.STYLES.WHITE,
    }),
    BlackOutline: ButtonFactory({
      size: Button.SIZES.LARGE,
      style: Button.STYLES.BLACK_OUTLINE,
    }),
    BlueOutline: ButtonFactory({
      size: Button.SIZES.LARGE,
      style: Button.STYLES.BLUE_OUTLINE,
    }),
  },

  Medium: {
    Blue: ButtonFactory({
      size: Button.SIZES.MEDIUM,
      style: Button.STYLES.BLUE,
    }),
    Yellow: ButtonFactory({
      size: Button.SIZES.MEDIUM,
      style: Button.STYLES.YELLOW,
    }),
    White: ButtonFactory({
      size: Button.SIZES.MEDIUM,
      style: Button.STYLES.WHITE,
    }),
    BlackOutline: ButtonFactory({
      size: Button.SIZES.MEDIUM,
      style: Button.STYLES.BLACK_OUTLINE,
    }),
    BlueOutline: ButtonFactory({
      size: Button.SIZES.MEDIUM,
      style: Button.STYLES.BLUE_OUTLINE,
    }),
  },

  Small: {
    Blue: ButtonFactory({
      size: Button.SIZES.SMALL,
      style: Button.STYLES.BLUE,
    }),
    Yellow: ButtonFactory({
      size: Button.SIZES.SMALL,
      style: Button.STYLES.YELLOW,
    }),
    White: ButtonFactory({
      size: Button.SIZES.SMALL,
      style: Button.STYLES.WHITE,
    }),
    BlackOutline: ButtonFactory({
      size: Button.SIZES.SMALL,
      style: Button.STYLES.BLACK_OUTLINE,
    }),
    BlueOutline: ButtonFactory({
      size: Button.SIZES.SMALL,
      style: Button.STYLES.BLUE_OUTLINE,
    }),
  },

  Tiny: {
    Blue: ButtonFactory({
      size: Button.SIZES.TINY,
      style: Button.STYLES.BLUE,
    }),
    Yellow: ButtonFactory({
      size: Button.SIZES.TINY,
      style: Button.STYLES.YELLOW,
    }),
    White: ButtonFactory({
      size: Button.SIZES.TINY,
      style: Button.STYLES.WHITE,
    }),
    BlackOutline: ButtonFactory({
      size: Button.SIZES.TINY,
      style: Button.STYLES.BLACK_OUTLINE,
    }),
    BlueOutline: ButtonFactory({
      size: Button.SIZES.TINY,
      style: Button.STYLES.BLUE_OUTLINE,
    }),
  },
}

export { PublicButtonComponents as Button }
