import { Type, TypeFoundry } from './Type.js'

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
