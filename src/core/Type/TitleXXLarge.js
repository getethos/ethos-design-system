import { Type, TypeFoundry } from './Type.js'

export const TitleXXLarge = {
  Sans: {
    Light300: TypeFoundry({
      subtype: Type.SUBTYPES.TITLE_XXLARGE,
      typeface: Type.TYPEFACES.THEINHARDT,
      weight: Type.WEIGHTS.LIGHT_300,
    }),
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
