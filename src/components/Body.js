import { TypeBase, TypeFoundry } from './TypeBase/TypeBase.js'

export const Body = {
  Regular400: TypeFoundry({
    subtype: TypeBase.SUBTYPES.BODY,
    typeface: TypeBase.TYPEFACES.THEINHARDT,
    weight: TypeBase.WEIGHTS.REGULAR_400,
  }),
  Medium500: TypeFoundry({
    subtype: TypeBase.SUBTYPES.BODY,
    typeface: TypeBase.TYPEFACES.THEINHARDT,
    weight: TypeBase.WEIGHTS.MEDIUM_500,
  }),
}
