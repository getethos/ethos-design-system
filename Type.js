import React from 'react'
import PropTypes from 'prop-types'

import { COLORS } from './Colors'

/* @getethos/design-system/Type.js

   Legend:

   - `Type` is a private component that returns an element with CSS classes.
   - `Type.scss` (not imported here) implements those CSS classes.
   - `TypeFoundry` is a HOC that creates public components with correct props.
   - `<Text.M.Regular>`, etc. are the set of Design-approved public components.
   ========================================================================== */

/**
 * `Type` is a private component that returns an element with CSS classes.
 *
 * Note that it is ignorant of which combinations Design considers legal or
 * illegal. Legal combinations must be declared via the enumerated exports at
 * the end of this file.
 *
 * The public props (Type.PUBLIC_PROPS) may be passed in downstream.
 * Other props may only be specified in this file.
 *
 * @param  {String}  props.children       The text to display
 * @param  {String}  props.element        Override the default <element>
 * @param  {String}  props.subtype        (private) Header vs. Text
 * @param  {String}  props.size           (private) XXL, L, S, etc.
 * @param  {String}  props.typeface       (private) Typeface
 * @param  {String}  props.weight         (private) Typeface weight
 */
function Type({
  children,
  color,
  element,
  subtype,
  size,
  typeface,
  weight,
  ...unexpectedProps
}) {
  // Fail loudly
  const isValidColor = Object.values(Type.COLORS).includes(color)
  const isValidSubtype = Object.values(Type.SUBTYPES).includes(subtype)
  const isValidSize = Object.values(Type.SIZES).includes(size)
  const isValidTypeface = Object.values(Type.TYPEFACES).includes(typeface)
  const isValidWeight = Object.values(Type.WEIGHTS).includes(weight)
  const unexpectedProp = Object.keys(unexpectedProps)[0]
  if (!isValidColor) throw new TypeError(`Invalid color '${color}'.`)
  if (!isValidSubtype) throw new TypeError(`Invalid subtype '${subtype}'.`)
  if (!isValidSize) throw new TypeError(`Invalid size '${size}'.`)
  if (!isValidTypeface) throw new TypeError(`Invalid typeface '${typeface}'.`)
  if (!isValidWeight) throw new TypeError(`Invalid weight '${weight}'.`)
  if (unexpectedProp) throw new TypeError(`Unexpected prop '${unexpectedProp}'`)

  const classNames = [subtype, size, typeface, weight, color]

  const isHeading = Type.SUBTYPES.HEADING === subtype
  const defaultElement = isHeading ? Type.HEADING_ELEMENTS[size] : 'div'
  const Element = element || defaultElement

  return <Element className={classNames.join(' ')}>{children}</Element>
}

Type.SUBTYPES = {
  HEADING: 'Heading',
  TEXT: 'Text',
}

Type.TYPEFACES = {
  AMERICANE: 'Americane',
  UNTITLED_SANS: 'UntitledSans',
}

Type.SIZES = {
  XXXL: 'XXXL',
  XXL: 'XXL',
  XL: 'XL',
  L: 'L',
  M: 'M',
  S: 'S',
  XS: 'XS',
}

Type.WEIGHTS = {
  REGULAR: 'Regular400', // currently UntitledSans-only
  MEDIUM: 'Medium500', // currently UntitledSans-only
  BLACK: 'Black900', // currently Americane-only
}

Type.COLORS = {
  BRAND_BLUE: COLORS.BRAND_BLUE,
  BRAND_YELLOW: COLORS.BRAND_YELLOW,
  BLACK: COLORS.BLACK,
  GRAY_DARKEST: COLORS.GRAY_DARKEST,
  GRAY_DARK: COLORS.GRAY_DARK,
  GRAY_LIGHT: COLORS.GRAY_LIGHT,
  GRAY_LIGHTEST: COLORS.GRAY_LIGHTEST,
  WHITE: COLORS.WHITE,
  SKY: COLORS.SKY,
}

Type.HEADING_ELEMENTS = {
  XXXL: 'h1',
  XXL: 'h2',
  XL: 'h3',
  L: 'h4',
  M: 'h5',
  S: 'h6',
  XS: 'h6',
}

Type.ELEMENTS = [...Object.values(Type.HEADING_ELEMENTS), 'div', 'span']

Type.PUBLIC_PROPS = {
  children: PropTypes.string,
  color: PropTypes.oneOf(Object.values(Type.COLORS)),
  element: PropTypes.oneOf(Type.ELEMENTS),
}

Type.propTypes = {
  ...Type.PUBLIC_PROPS,
  subtype: PropTypes.oneOf(Object.values(Type.SUBTYPES)),
  size: PropTypes.oneOf(Object.values(Type.SIZES)),
  typeface: PropTypes.oneOf(Object.values(Type.TYPEFACES)),
  weight: PropTypes.oneOf(Object.values(Type.WEIGHTS)),
}

Type.defaultProps = {
  color: Type.COLORS.BLACK,
}

function TypeFoundry(privateProps) {
  function throwIllegalProp(prop) {
    const isIllegal = !Object.keys(Type.PUBLIC_PROPS).includes(prop)
    if (isIllegal) throw new TypeError(`Illegal prop '${prop}'`)
  }

  const PublicTypeComponent = (downstreamProps) => {
    Object.keys(downstreamProps).forEach(throwIllegalProp)
    return <Type {...downstreamProps} {...privateProps} />
  }

  return PublicTypeComponent
}

export const Heading = {
  COLORS: { ...Type.COLORS },
  SIZES: { ...Type.SIZES },
  XXXL: {
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.XXXL,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.XXXL,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
    Americane: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.XXXL,
      typeface: Type.TYPEFACES.AMERICANE,
      weight: Type.WEIGHTS.BLACK,
    }),
  },

  XXL: {
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.XXL,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.XXL,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
    Americane: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.XXL,
      typeface: Type.TYPEFACES.AMERICANE,
      weight: Type.WEIGHTS.BLACK,
    }),
  },

  XL: {
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.XL,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.XL,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
  },

  L: {
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.L,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.L,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
  },

  M: {
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.M,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.M,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
  },

  S: {
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.S,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.S,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
  },

  XS: {
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.XS,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.HEADING,
      size: Type.SIZES.XS,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
  },
}

export const Text = {
  COLORS: { ...Type.COLORS },
  SIZES: { ...Type.SIZES },
  XXXL: {
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.XXXL,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.XXXL,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
  },

  XXL: {
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.XXL,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.XXL,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
  },

  XL: {
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.XL,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.XL,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
  },

  L: {
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.L,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.L,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
  },

  M: {
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.M,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.M,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
  },

  S: {
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.S,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.S,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
  },

  XS: {
    Regular: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.XS,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.REGULAR,
    }),
    Medium: TypeFoundry({
      subtype: Type.SUBTYPES.TEXT,
      size: Type.SIZES.XS,
      typeface: Type.TYPEFACES.UNTITLED_SANS,
      weight: Type.WEIGHTS.MEDIUM,
    }),
  },
}

// Aliases

export const Eyebrow = (props) => {
  // TODO: add props to the Type component to make this div unnecessary.
  return (
    <div className="Eyebrow">
      <Heading.XS.Medium {...props} />
    </div>
  )
}
