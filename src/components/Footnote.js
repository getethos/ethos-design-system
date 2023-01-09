import { TypeBase, TypeFoundry } from './TypeBase/TypeBase.js'

export const Footnote = {
  Regular400: TypeFoundry({
    subtype: TypeBase.SUBTYPES.FOOTNOTE,
    typeface: TypeBase.TYPEFACES.THEINHARDT,
    weight: TypeBase.WEIGHTS.REGULAR_400,
  }),
  Medium500: TypeFoundry({
    subtype: TypeBase.SUBTYPES.FOOTNOTE,
    typeface: TypeBase.TYPEFACES.THEINHARDT,
    weight: TypeBase.WEIGHTS.MEDIUM_500,
  }),
  HeadingH4: TypeFoundry({
    subtype: TypeBase.SUBTYPES.FOOTNOTE,
    typeface: TypeBase.TYPEFACES.THEINHARDT,
    weight: TypeBase.WEIGHTS.MEDIUM_500,
    element: TypeBase.ELEMENTS.H4,
  }),
}
