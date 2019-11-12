import { Type, TypeFoundry } from './Type'

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
