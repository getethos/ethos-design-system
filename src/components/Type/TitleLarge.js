import { TypeBase, TypeFoundry } from '../TypeBase/TypeBase.js'

export const TitleLarge = {
  Sans: {
    Light300: TypeFoundry({
      subtype: TypeBase.SUBTYPES.TITLE_LARGE,
      typeface: TypeBase.TYPEFACES.THEINHARDT,
      weight: TypeBase.WEIGHTS.LIGHT_300,
    }),
    Medium500: TypeFoundry({
      subtype: TypeBase.SUBTYPES.TITLE_LARGE,
      typeface: TypeBase.TYPEFACES.THEINHARDT,
      weight: TypeBase.WEIGHTS.MEDIUM_500,
    }),
    Regular400: TypeFoundry({
      subtype: TypeBase.SUBTYPES.TITLE_LARGE,
      typeface: TypeBase.TYPEFACES.THEINHARDT,
      weight: TypeBase.WEIGHTS.REGULAR_400,
    }),
  },
  Serif: {
    Regular400: TypeFoundry({
      subtype: TypeBase.SUBTYPES.TITLE_LARGE,
      typeface: TypeBase.TYPEFACES.CAMBON,
      weight: TypeBase.WEIGHTS.REGULAR_400,
    }),
    Book500: TypeFoundry({
      subtype: TypeBase.SUBTYPES.TITLE_LARGE,
      typeface: TypeBase.TYPEFACES.CAMBON,
      weight: TypeBase.WEIGHTS.BOOK_500,
    }),
    Demi600: TypeFoundry({
      subtype: TypeBase.SUBTYPES.TITLE_LARGE,
      typeface: TypeBase.TYPEFACES.CAMBON,
      weight: TypeBase.WEIGHTS.DEMI_600,
    }),
  },
}
