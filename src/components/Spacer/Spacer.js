import { Space } from './Space'
import { SpacerFactory } from './SpacerFactory'

export const Spacer = {
  H80: SpacerFactory({ height: Space.HEIGHTS.H80 }),
  H72: SpacerFactory({ height: Space.HEIGHTS.H72 }),
  H64: SpacerFactory({ height: Space.HEIGHTS.H64 }),
  H56: SpacerFactory({ height: Space.HEIGHTS.H56 }),
  H48: SpacerFactory({ height: Space.HEIGHTS.H48 }),
  H40: SpacerFactory({ height: Space.HEIGHTS.H40 }),
  H32: SpacerFactory({ height: Space.HEIGHTS.H32 }),
  H24: SpacerFactory({ height: Space.HEIGHTS.H24 }),
  H16: SpacerFactory({ height: Space.HEIGHTS.H16 }),
  H8: SpacerFactory({ height: Space.HEIGHTS.H8 }),
  H4: SpacerFactory({ height: Space.HEIGHTS.H4 }),
  W80: SpacerFactory({ width: Space.WIDTHS.W80 }),
  W72: SpacerFactory({ width: Space.WIDTHS.W72 }),
  W64: SpacerFactory({ width: Space.WIDTHS.W64 }),
  W56: SpacerFactory({ width: Space.WIDTHS.W56 }),
  W48: SpacerFactory({ width: Space.WIDTHS.W48 }),
  W40: SpacerFactory({ width: Space.WIDTHS.W40 }),
  W32: SpacerFactory({ width: Space.WIDTHS.W32 }),
  W24: SpacerFactory({ width: Space.WIDTHS.W24 }),
  W16: SpacerFactory({ width: Space.WIDTHS.W16 }),
  W8: SpacerFactory({ width: Space.WIDTHS.W8 }),
  W4: SpacerFactory({ width: Space.WIDTHS.W4 }),
}
