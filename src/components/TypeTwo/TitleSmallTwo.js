import { TypeBase, TypeFoundry } from '../TypeBase/TypeBase.js'

// Currently drastically different than existing TitleSmall for testing purposes
export const TitleSmallTwo = {
  Sans: {
    Light300: TypeFoundry({
      subtype: TypeBase.SUBTYPES.TITLE_MEDIUM,
      typeface: TypeBase.TYPEFACES.THEINHARDT,
      weight: TypeBase.WEIGHTS.MEDIUM_500,
    }),
  },
}
