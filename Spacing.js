import React from 'react'
import PropTypes from 'prop-types'

function Space({ height, width, flexGrow }) {
  const validHeight = Object.values(Space.HEIGHTS).find((h) => h === height)
  if (height && !validHeight) throw new TypeError('Invalid height.')
  const validWidth = Object.values(Space.WIDTHS).find((w) => w === width)
  if (width && !validWidth) throw new TypeError('Invalid width.')
  if (!width && !height) throw new TypeError('Must specify width or height.')

  const style = {}
  if (validWidth) style.width = validWidth
  if (validHeight) style.height = validHeight

  return <div className="Spacer" style={style} />
}

Space.HEIGHTS = {
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

Space.WIDTHS = {
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

Space.PUBLIC_PROPS = {}

Space.propTypes = {
  ...Space.PUBLIC_PROPS,
  height: PropTypes.oneOf(Object.values(Space.HEIGHTS)),
  width: PropTypes.oneOf(Object.values(Space.WIDTHS)),
}

function SpacerFactory(privateProps) {
  function throwIllegalProp(prop) {
    const isIllegal = !Object.keys(Space.PUBLIC_PROPS).includes(prop)
    if (isIllegal) throw new TypeError(`Illegal prop '${prop}'`)
  }

  const PublicSpacerComponent = (downstreamProps) => {
    Object.keys(downstreamProps).forEach(throwIllegalProp)
    return <Space {...downstreamProps} {...privateProps} />
  }

  return PublicSpacerComponent
}

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
