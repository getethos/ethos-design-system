import { Type, TypeFoundry } from './Type.js'

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
