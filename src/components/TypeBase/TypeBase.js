import React from 'react'
import PropTypes from 'prop-types'

import useIncludes from '../../hooks/useIncludes.js'
import useInvalid from '../../hooks/useInvalid.js'
import { COLORS } from '../Colors'
import styles from './TypeBase.module.scss'

/* @getethos/design-system/TypeBase.js

   Legend:

   - `TypeBase` is a private component that returns an element with CSS classes.
   - `TypeBase.module.scss` styles the element via the classes.
   - `TypeFoundry` is a HOC that creates public components with correct props.
   - `<Caption.Medium500>`, etc. are the Design-approved public components.
   ========================================================================== */

/**
 * `TypeBase` is a private component that returns an element with CSS classes.
 *
 * Note that it is ignorant of which combinations Design considers legal or
 * illegal. Legal combinations must be declared via the enumerated exports at
 * the end of this file.
 *
 * The public props (TypeBase.PUBLIC_PROPS) may be passed in downstream.
 * Other props may only be specified in this file.
 *
 * @param  {Object}  props
 * @param  {String}  props.children       The text to display
 * @param  {Boolean} props.centered       Whether to text-align: center
 * @param  {Boolean} props.allCaps        Whether to text-transform to: uppercase
 * @param  {String}  props.element        Override the default <element>
 * @param  {String}  props.id             HTML id, used in aria-labelledby
 * @param  {String}  props.subtype        (private) e.g. Caption vs. TitleSmall
 * @param  {String}  props.typeface       (private) Typeface
 * @param  {String}  props.weight         (private) Typeface weight
 */
export const TypeBase = ({
  children,
  centered,
  allCaps,
  capitalize,
  color,
  element: Element = 'div',
  subtype,
  typeface,
  weight,
  elementClasses,
  ...rest
}) => {
  // Verify that color, subtype, typeface, and weight were valid enum values
  const [isValidColor] = useIncludes(TypeBase.COLORS)
  color && isValidColor(color)
  const [isValidSubtype] = useIncludes(TypeBase.SUBTYPES)
  isValidSubtype(subtype)
  const [isValidTypeface] = useIncludes(TypeBase.TYPEFACES)
  isValidTypeface(typeface)
  const [isValidWeight] = useIncludes(TypeBase.WEIGHTS)
  isValidWeight(weight)

  const WHITELISTED_PROPS = ['htmlFor', 'data-tid', 'id']
  const [, isWhiteListedProp] = useIncludes(WHITELISTED_PROPS)
  isWhiteListedProp(rest)

  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(Object.keys(TypeBase.PUBLIC_PROPS))
  includesInvalid(rest)

  // Generate list of css classes
  const classNames = [styles[subtype], styles[typeface], styles[weight]]
  if (color) classNames.push(styles[color])
  if (centered) classNames.push(styles.Centered)
  if (allCaps) classNames.push(styles.AllCaps)
  if (capitalize) classNames.push(styles.Capitalize)
  if (elementClasses) classNames.push(elementClasses)

  const allowedProps = Object.keys(rest).reduce((acc, key) => {
    acc[key] = rest[key]
    return acc
  }, {})

  return (
    <Element className={classNames.join(' ')} {...allowedProps}>
      {children}
    </Element>
  )
}

TypeBase.SUBTYPES = {
  // Original Type
  CAPTION: 'Caption', // smallest
  FOOTNOTE: 'Footnote',
  BODY: 'Body', // default
  TITLE_SMALL: 'TitleSmall',
  TITLE_MEDIUM: 'TitleMedium',
  TITLE_LARGE: 'TitleLarge',
  TITLE_XLARGE: 'TitleXLarge',
  TITLE_XXLARGE: 'TitleXXLarge',
  // Type2
  CAPTION2: 'Caption2',
  BODY2: 'Body2',
  TITLE_SMALL2: 'TitleSmall2',
  TITLE_MEDIUM2: 'TitleMedium2',
  TITLE_LARGE2: 'TitleLarge2',
  TITLE_XLARGE2: 'TitleXLarge2',
  EYEBROW2: 'Eyebrow2',
}

TypeBase.TYPEFACES = {
  THEINHARDT: 'Theinhardt', // sans
  CAMBON: 'Cambon', // serif
}

TypeBase.WEIGHTS = {
  // Possibly we shouldn't lump these all together given they vary per typeface.
  LIGHT_300: 'Light300',
  REGULAR_400: 'Regular400',
  MEDIUM_500: 'Medium500',
  BOOK_500: 'Book500',
  DEMI_600: 'Demi600',
}

TypeBase.COLORS = {
  // Brand
  BRAND_BUTTERCUP: COLORS.BRAND_BUTTERCUP,
  BRAND_DUCKEGG: COLORS.BRAND_DUCKEGG,
  BRAND_FOREST: COLORS.BRAND_FOREST,
  BRAND_MOSS: COLORS.BRAND_MOSS,
  BRAND_MOSS_TRANSLUCENT: COLORS.BRAND_MOSS_TRANSLUSCENT,
  BRAND_SALAMANDER: COLORS.BRAND_SALAMANDER,
  BRAND_SAND: COLORS.BRAND_SAND,

  // Grayscale
  GRAY_DARK_HOVER: COLORS.GRAY_DARK_HOVER,
  GRAY_DARK_HOVER_TRANS: COLORS.GRAY_DARK_HOVER_TRANS,
  GRAY_LIGHT_HOVER: COLORS.GRAY_LIGHT_HOVER,
  GRAY_LIGHT_HOVER_TRANS: COLORS.GRAY_LIGHT_HOVER_TRANS,
  GRAY_PRIMARY: COLORS.GRAY_PRIMARY,
  GRAY_PRIMARY_TRANS: COLORS.GRAY_PRIMARY_TRANS,
  GRAY_SECONDARY: COLORS.GRAY_SECONDARY,
  GRAY_SECONDARY_TRANS: COLORS.GRAY_SECONDARY_TRANS,
  GRAY_STROKE_AND_DISABLED: COLORS.GRAY_STROKE_AND_DISABLED,
  GRAY_STROKE_AND_DISABLED_TRANS: COLORS.GRAY_STROKE_AND_DISABLED_TRANS,
  WHITE: COLORS.WHITE,
}

TypeBase.ELEMENTS = {
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

TypeBase.PUBLIC_PROPS = {
  children: PropTypes.node,
  centered: PropTypes.bool,
  allCaps: PropTypes.bool,
  /** text transform capitalize label */
  capitalize: PropTypes.bool,
  color: PropTypes.oneOf(Object.values(TypeBase.COLORS)),
  /** Defaults to 'div', but can be overridden with certain elements */
  element: PropTypes.oneOf(Object.values(TypeBase.ELEMENTS)),
  elementClasses: PropTypes.string,
  htmlFor: PropTypes.string,
  'data-tid': PropTypes.string,
  id: PropTypes.string,
}

TypeBase.propTypes = {
  ...TypeBase.PUBLIC_PROPS,
  typeface: PropTypes.oneOf(Object.values(TypeBase.TYPEFACES)),
  weight: PropTypes.oneOf(Object.values(TypeBase.WEIGHTS)),
}

export const TypeFoundry = (privateProps) => {
  function throwIllegalProp(prop) {
    const isIllegal = !Object.keys(TypeBase.PUBLIC_PROPS).includes(prop)
    if (isIllegal) throw new TypeError(`Illegal prop '${prop}'`)
  }

  const PublicTypeComponent = (downstreamProps) => {
    Object.keys(downstreamProps).forEach(throwIllegalProp)
    return <TypeBase {...downstreamProps} {...privateProps} />
  }

  return PublicTypeComponent
}
