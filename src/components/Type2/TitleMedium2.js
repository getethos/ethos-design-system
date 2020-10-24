import { TypeBase, TypeFoundry } from '../TypeBase/TypeBase'

export const TitleMedium2 = {
  Sans: {
    Medium500: TypeFoundry({
      subtype: TypeBase.SUBTYPES.TITLE_MEDIUM2,
      typeface: TypeBase.TYPEFACES.THEINHARDT,
      weight: TypeBase.WEIGHTS.MEDIUM_500,
    }),
    Regular400: TypeFoundry({
      subtype: TypeBase.SUBTYPES.TITLE_MEDIUM2,
      typeface: TypeBase.TYPEFACES.THEINHARDT,
      weight: TypeBase.WEIGHTS.REGULAR_400,
    }),
  },
  Serif: {
    Medium500: TypeFoundry({
      subtype: TypeBase.SUBTYPES.TITLE_MEDIUM2,
      typeface: TypeBase.TYPEFACES.CAMBON,
      weight: TypeBase.WEIGHTS.MEDIUM_500,
    }),
    Book500: TypeFoundry({
      subtype: TypeBase.SUBTYPES.TITLE_MEDIUM2,
      typeface: TypeBase.TYPEFACES.CAMBON,
      weight: TypeBase.WEIGHTS.BOOK_500,
    }),
  },
}
