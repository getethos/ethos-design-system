import React from 'react'
import PropTypes from 'prop-types'

import { COLORS } from './Colors'

/* @getethos/design-system/Type.js

   Legend:

   - `Type` is a private component that returns an element with CSS classes.
   - `Type.scss` (not imported here) implements those CSS classes.
   - `TypeFoundry` is a HOC that creates public components with correct props.
   - `<Caption.Medium500>`, etc. are the Design-approved public components.
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
 * @param  {Boolean} props.centered       Whether to text-align: center
 * @param  {String}  props.element        Override the default <element>
 * @param  {String}  props.subtype        (private) e.g. Caption vs. TitleSmall
 * @param  {String}  props.typeface       (private) Typeface
 * @param  {String}  props.weight         (private) Typeface weight
 */
function Type({
  children,
  centered,
  color,
  element,
  subtype,
  typeface,
  weight,
  ...rest
}) {
  // Fail loudly
  const isValidColor = Object.values(Type.COLORS).includes(color)
  if (!isValidColor) throw new TypeError(`Invalid color '${color}'.`)

  const isValidSubtype = Object.values(Type.SUBTYPES).includes(subtype)
  if (!isValidSubtype) throw new TypeError(`Invalid subtype '${subtype}'.`)

  const isValidTypeface = Object.values(Type.TYPEFACES).includes(typeface)
  if (!isValidTypeface) throw new TypeError(`Invalid typeface '${typeface}'.`)

  const isValidWeight = Object.values(Type.WEIGHTS).includes(weight)
  if (!isValidWeight) throw new TypeError(`Invalid weight '${weight}'.`)

  const WHITELISTED_PROPS = ['htmlFor', 'data-tid']
  const unexpectedPropKeys = Object.keys(rest).filter(
    (prop) => !WHITELISTED_PROPS.includes(prop)
  )
  if (unexpectedPropKeys.length > 0)
    throw new TypeError(`Unexpected props: '${unexpectedPropKeys.join(', ')}'`)

  const classNames = [subtype, typeface, weight, color]
  if (centered) classNames.push('Centered')

  const Element = element || 'div'

  const allowedProps = Object.keys(rest)
    .filter((prop) => WHITELISTED_PROPS.includes(prop))
    .reduce((acc, key) => {
      acc[key] = rest[key]
      return acc
    }, {})

  return (
    <Element className={classNames.join(' ')} {...allowedProps}>
      {children}
    </Element>
  )
}

Type.SUBTYPES = {
  CAPTION: 'Caption', // smallest
  FOOTNOTE: 'Footnote',
  BODY: 'Body', // default
  TITLE_SMALL: 'TitleSmall',
  TITLE_MEDIUM: 'TitleMedium',
  TITLE_LARGE: 'TitleLarge',
  TITLE_XLARGE: 'TitleXLarge',
  TITLE_XXLARGE: 'TitleXXLarge',
}

Type.TYPEFACES = {
  THEINHARDT: 'Theinhardt', // sans
  CAMBON: 'Cambon', // serif
}

Type.WEIGHTS = {
  // Possibly we shouldn't lump these all together given they vary per typeface.
  REGULAR_400: 'Regular400',
  MEDIUM_500: 'Medium500',
  BOOK_500: 'Book500',
  DEMI_600: 'Demi600',
}

Type.COLORS = {
  // Brand
  BRAND_FOREST: COLORS.BRAND_FOREST,

  // Grayscale
  GRAY_PRIMARY: COLORS.GRAY_PRIMARY,
  GRAY_SECONDARY: COLORS.GRAY_SECONDARY,
  WHITE: COLORS.WHITE,
}

Type.ELEMENTS = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
  DIV: 'div',
  LI: 'li',
  SPAN: 'span',
  LABEL: 'label',
}

Type.PUBLIC_PROPS = {
  children: PropTypes.node,
  centered: PropTypes.bool,
  color: PropTypes.oneOf(Object.values(Type.COLORS)),
  element: PropTypes.oneOf(Object.values(Type.ELEMENTS)),
  htmlFor: PropTypes.string,
  'data-tid': PropTypes.string,
}

Type.propTypes = {
  ...Type.PUBLIC_PROPS,
  typeface: PropTypes.oneOf(Object.values(Type.TYPEFACES)),
  weight: PropTypes.oneOf(Object.values(Type.WEIGHTS)),
}

Type.defaultProps = {
  color: Type.COLORS.GRAY_PRIMARY,
}

function TypeFoundry(privateProps) {
  function throwIllegalProp(prop) {
    const isIllegal = !Object.keys(Type.PUBLIC_PROPS).includes(prop)
    if (isIllegal) throw new TypeError(`Illegal prop '${prop}'`)
  }

  // TODO: figure out if downstream or upstream is the correct nomenclature here
  const PublicTypeComponent = (downstreamProps) => {
    Object.keys(downstreamProps).forEach(throwIllegalProp)
    return <Type {...downstreamProps} {...privateProps} />
  }

  return PublicTypeComponent
}

export const Caption = {
  Regular400: TypeFoundry({
    subtype: Type.SUBTYPES.CAPTION,
    typeface: Type.TYPEFACES.THEINHARDT,
    weight: Type.WEIGHTS.REGULAR_400,
  }),
  Medium500: TypeFoundry({
    subtype: Type.SUBTYPES.CAPTION,
    typeface: Type.TYPEFACES.THEINHARDT,
    weight: Type.WEIGHTS.MEDIUM_500,
  }),
}

export const Footnote = {
  Regular400: TypeFoundry({
    subtype: Type.SUBTYPES.FOOTNOTE,
    typeface: Type.TYPEFACES.THEINHARDT,
    weight: Type.WEIGHTS.REGULAR_400,
  }),
  Medium500: TypeFoundry({
    subtype: Type.SUBTYPES.FOOTNOTE,
    typeface: Type.TYPEFACES.THEINHARDT,
    weight: Type.WEIGHTS.MEDIUM_500,
  }),
}

export const Body = {
  Regular400: TypeFoundry({
    subtype: Type.SUBTYPES.BODY,
    typeface: Type.TYPEFACES.THEINHARDT,
    weight: Type.WEIGHTS.REGULAR_400,
  }),
  Medium500: TypeFoundry({
    subtype: Type.SUBTYPES.BODY,
    typeface: Type.TYPEFACES.THEINHARDT,
    weight: Type.WEIGHTS.MEDIUM_500,
  }),
}

export const TitleSmall = {
  Sans: {
    Regular400: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_SMALL,
      typeface: Type.TYPEFACES.THEINHARDT,
      weight: Type.WEIGHTS.REGULAR_400,
    }),
    Medium500: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_SMALL,
      typeface: Type.TYPEFACES.THEINHARDT,
      weight: Type.WEIGHTS.MEDIUM_500,
    }),
  },
  Serif: {
    Regular400: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_SMALL,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.REGULAR_400,
    }),
    Book500: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_SMALL,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.BOOK_500,
    }),
    Demi600: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_SMALL,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.DEMI_600,
    }),
  },
}

export const TitleMedium = {
  Sans: {
    Medium500: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_MEDIUM,
      typeface: Type.TYPEFACES.THEINHARDT,
      weight: Type.WEIGHTS.MEDIUM_500,
    }),
    Regular400: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_MEDIUM,
      typeface: Type.TYPEFACES.THEINHARDT,
      weight: Type.WEIGHTS.REGULAR_400,
    }),
  },
  Serif: {
    Regular400: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_MEDIUM,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.REGULAR_400,
    }),
    Book500: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_MEDIUM,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.BOOK_500,
    }),
    Demi600: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_MEDIUM,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.DEMI_600,
    }),
  },
}

export const TitleLarge = {
  Sans: {
    Medium500: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_LARGE,
      typeface: Type.TYPEFACES.THEINHARDT,
      weight: Type.WEIGHTS.MEDIUM_500,
    }),
    Regular400: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_LARGE,
      typeface: Type.TYPEFACES.THEINHARDT,
      weight: Type.WEIGHTS.REGULAR_400,
    }),
  },
  Serif: {
    Regular400: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_LARGE,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.REGULAR_400,
    }),
    Book500: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_LARGE,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.BOOK_500,
    }),
    Demi600: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_LARGE,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.DEMI_600,
    }),
  },
}

export const TitleXLarge = {
  Sans: {
    Medium500: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_XLARGE,
      typeface: Type.TYPEFACES.THEINHARDT,
      weight: Type.WEIGHTS.MEDIUM_500,
    }),
    Regular400: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_XLARGE,
      typeface: Type.TYPEFACES.THEINHARDT,
      weight: Type.WEIGHTS.REGULAR_400,
    }),
  },
  Serif: {
    Regular400: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_XLARGE,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.REGULAR_400,
    }),
    Book500: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_XLARGE,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.BOOK_500,
    }),
    Demi600: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_XLARGE,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.DEMI_600,
    }),
  },
}

export const TitleXXLarge = {
  Sans: {
    Medium500: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_XXLARGE,
      typeface: Type.TYPEFACES.THEINHARDT,
      weight: Type.WEIGHTS.MEDIUM_500,
    }),
    Regular400: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_XXLARGE,
      typeface: Type.TYPEFACES.THEINHARDT,
      weight: Type.WEIGHTS.REGULAR_400,
    }),
  },
  Serif: {
    Regular400: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_XXLARGE,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.REGULAR_400,
    }),
    Book500: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_XXLARGE,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.BOOK_500,
    }),
    Demi600: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_XXLARGE,
      typeface: Type.TYPEFACES.CAMBON,
      weight: Type.WEIGHTS.DEMI_600,
    }),
  },
}

// Links – WIP. For now let's just export CSS classes and be otherwise agnostic.

export const Link = {
  CLASS_NAME: 'Link',
  STYLE_VARIANTS: {
    INHERIT: 'Inherit',
    STANDARD: 'Standard',
    NAVLINK: 'Navlink',
    HAMBURGER_MENU: 'HamburgerMenu',
  },
}
