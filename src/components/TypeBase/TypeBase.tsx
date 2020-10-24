import * as PropTypes from 'prop-types'
import * as React from 'react'
import useIncludes from '../../hooks/useIncludes.js'
import useInvalid from '../../hooks/useInvalid.js'
import { COLORS } from '../Colors'
import styles from './TypeBase.module.scss'
type TypeBaseProps = {
  centered?: boolean
  allCaps?: boolean
  capitalize?: boolean
  color?: any
  element?: any
  htmlFor?: string
  'data-tid'?: string
  id?: string
  typeface?: any
  weight?: any
  subtype: string
}
const SUBTYPES = {
  // Original Type
  CAPTION: 'Caption',
  FOOTNOTE: 'Footnote',
  BODY: 'Body',
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
}
const TYPEFACES = {
  THEINHARDT: 'Theinhardt',
  CAMBON: 'Cambon',
}
const WEIGHTS = {
  // Possibly we shouldn't lump these all together given they vary per typeface.
  LIGHT_300: 'Light300',
  REGULAR_400: 'Regular400',
  MEDIUM_500: 'Medium500',
  BOOK_500: 'Book500',
  DEMI_600: 'Demi600',
}
const TYPE_COLORS = {
  // Brand
  BRAND_FOREST: COLORS.BRAND_FOREST,
  BRAND_SALAMANDER: COLORS.BRAND_SALAMANDER,
  // Grayscale
  GRAY_PRIMARY: COLORS.GRAY_PRIMARY,
  GRAY_SECONDARY: COLORS.GRAY_SECONDARY,
  GRAY_STROKE_AND_DISABLED: COLORS.GRAY_STROKE_AND_DISABLED,
  WHITE: COLORS.WHITE,
}
const ELEMENTS = {
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
const PUBLIC_PROPS = {
  children: PropTypes.node,
  centered: PropTypes.bool,
  allCaps: PropTypes.bool,
  /** text transform capitalize label */
  capitalize: PropTypes.bool,
  color: PropTypes.oneOf(Object.values(TYPE_COLORS)),
  element: PropTypes.oneOf(Object.values(ELEMENTS)),
  htmlFor: PropTypes.string,
  'data-tid': PropTypes.string,
  id: PropTypes.string,
}
/* @getethos/design-system/TypeBase

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
 * @param  {String}  props.children       The text to display
 * @param  {Boolean} props.centered       Whether to text-align: center
 * @param  {Boolean} props.allCaps        Whether to text-transform to: uppercase
 * @param  {String}  props.element        Override the default <element>
 * @param  {String}  props.id             HTML id, used in aria-labelledby
 * @param  {String}  props.subtype        (private) e.g. Caption vs. TitleSmall
 * @param  {String}  props.typeface       (private) Typeface
 * @param  {String}  props.weight         (private) Typeface weight
 */
export const TypeBase: React.FC<TypeBaseProps> & {
  SUBTYPES: typeof SUBTYPES
  TYPEFACES: typeof TYPEFACES
  WEIGHTS: typeof WEIGHTS
  COLORS: typeof COLORS
  ELEMENTS: typeof ELEMENTS
  PUBLIC_PROPS: typeof PUBLIC_PROPS
} = ({
  children,
  centered,
  allCaps,
  capitalize,
  color,
  element,
  subtype,
  typeface,
  weight,
  ...rest
}) => {
  // Verify that color, subtype, typeface, and weight were valid enum values
  const [isValidColor] = useIncludes(TYPE_COLORS)
  color && isValidColor(color)
  const [isValidSubtype] = useIncludes(SUBTYPES)
  isValidSubtype(subtype)
  const [isValidTypeface] = useIncludes(TYPEFACES)
  isValidTypeface(typeface)
  const [isValidWeight] = useIncludes(WEIGHTS)
  isValidWeight(weight)
  const WHITELISTED_PROPS = ['htmlFor', 'data-tid', 'id']
  const [, isWhiteListedProp] = useIncludes(WHITELISTED_PROPS)
  isWhiteListedProp(rest)
  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(Object.keys(PUBLIC_PROPS))
  includesInvalid(rest)
  // Generate list of css classes
  const classNames = [styles[subtype], styles[typeface], styles[weight]]
  if (color) classNames.push(styles[color])
  if (centered) classNames.push(styles.Centered)
  if (allCaps) classNames.push(styles.AllCaps)
  if (capitalize) classNames.push(styles.Capitalize)
  // Defaults to div, but can be overridden
  const Element = element || 'div'
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
TypeBase.SUBTYPES = SUBTYPES
TypeBase.TYPEFACES = TYPEFACES
TypeBase.WEIGHTS = WEIGHTS
TypeBase.COLORS = TYPE_COLORS
TypeBase.ELEMENTS = ELEMENTS
TypeBase.PUBLIC_PROPS = PUBLIC_PROPS

export const TypeFoundry = (privateProps) => {
  function throwIllegalProp(prop) {
    const isIllegal = !Object.keys(PUBLIC_PROPS).includes(prop)
    if (isIllegal) throw new TypeError(`Illegal prop '${prop}'`)
  }
  // TODO: figure out if downstream or upstream is the correct nomenclature here
  const PublicTypeComponent = (downstreamProps) => {
    Object.keys(downstreamProps).forEach(throwIllegalProp)
    return <TypeBase {...downstreamProps} {...privateProps} />
  }
  return PublicTypeComponent
}
