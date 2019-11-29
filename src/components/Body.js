import { Type, TypeFoundry } from './Type/Type.js'

export const Body = {
  Regular400: TypeFoundry({
    subtype: Type.SUBTYPES.BODY,
    typeface: Type.TYPEFACES.THEINHARDT,
    weight: Type.WEIGHTS.REGULAR_400,
  }),
  Medium500: TypeFoundry({
    subtype: Type.SUBTYPES.BODY,
    typeface: Type.TYPEFACES.THEINHARDT,
    weight: Type.WEIGHTS.MEDIUM_500,
  }),
}
