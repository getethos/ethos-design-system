import * as React from 'react'
import useInvalid from '../../hooks/useInvalid.js'
type SpaceProps = {
  height?: any
  width?: any
}
const HEIGHTS = {
  H80: 80,
  H72: 72,
  H64: 64,
  H56: 56,
  H48: 48,
  H40: 40,
  H32: 32,
  H24: 24,
  H16: 16,
  H8: 8,
  H4: 4,
  AUTO: 'auto',
}
const WIDTHS = {
  W80: 80,
  W72: 72,
  W64: 64,
  W56: 56,
  W48: 48,
  W40: 40,
  W32: 32,
  W24: 24,
  W16: 16,
  W8: 8,
  W4: 4,
  AUTO: 'auto',
}
export const Space: React.FC<SpaceProps> & {
  PUBLIC_PROPS: any
  HEIGHTS: typeof HEIGHTS
  WIDTHS: typeof WIDTHS
} = ({ height, width, ...rest }) => {
  // Verify that height and/or width were valid enum values
  const validHeight = Object.values(Space.HEIGHTS).find((h) => h === height)
  if (height && !validHeight) throw new TypeError('Invalid height.')
  const validWidth = Object.values(Space.WIDTHS).find((w) => w === width)
  if (width && !validWidth) throw new TypeError('Invalid width.')
  if (!width && !height) throw new TypeError('Must specify width or height.')
  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(Object.keys(Space.PUBLIC_PROPS))
  includesInvalid(rest)
  // Generate list of react styles
  const style: { width?: React.ReactText; height?: React.ReactText } = {}
  if (validWidth) style.width = validWidth
  if (validHeight) style.height = validHeight
  return <div className="Spacer" style={style} aria-hidden />
}
Space.HEIGHTS = HEIGHTS
Space.WIDTHS = WIDTHS
Space.PUBLIC_PROPS = {}
