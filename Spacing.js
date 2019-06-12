import React from 'react'
import PropTypes from 'prop-types'

function Space({ height, flexGrow }) {
  const validHeight = Object.values(Space.HEIGHTS).find((h) => h === height)
  if (!validHeight) throw new TypeError('Invalid height.')

  const classNames = ['Spacer']
  if (flexGrow) classNames.push('flexGrow')

  return (
    <div className={classNames.join(' ')} style={{ height: validHeight }} />
  )
}

Space.HEIGHTS = {
  H72: 72,
  H56: 56,
  H48: 48,
  H40: 40,
  H32: 32,
  H24: 24,
  H16: 16,
  H12: 12,
  H8: 8,
  H4: 4,
}

Space.PUBLIC_PROPS = {
  flexGrow: PropTypes.bool,
}

Space.propTypes = {
  ...Space.PUBLIC_PROPS,
  height: PropTypes.oneOf(Object.values(Space.HEIGHTS)),
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
  H72: SpacerFactory({ height: Space.HEIGHTS.H72 }),
  H56: SpacerFactory({ height: Space.HEIGHTS.H56 }),
  H48: SpacerFactory({ height: Space.HEIGHTS.H48 }),
  H40: SpacerFactory({ height: Space.HEIGHTS.H40 }),
  H32: SpacerFactory({ height: Space.HEIGHTS.H32 }),
  H24: SpacerFactory({ height: Space.HEIGHTS.H24 }),
  H16: SpacerFactory({ height: Space.HEIGHTS.H16 }),
  H12: SpacerFactory({ height: Space.HEIGHTS.H12 }),
  H8: SpacerFactory({ height: Space.HEIGHTS.H8 }),
  H4: SpacerFactory({ height: Space.HEIGHTS.H4 }),
}
