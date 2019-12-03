import React from 'react'
import PropTypes from 'prop-types'

import symbol from '../../svgs/logo-inline.svg'

function LogoInline(props) {
  const getLinkHref = () => `#${symbol.id}`
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={symbol.viewBox} {...props}>
      <use xlinkHref={getLinkHref()} />
    </svg>
  )
}

LogoInline.propTypes = {
  style: PropTypes.object,
}

LogoInline.defaultProps = {
  style: { display: 'block', height: 14 },
}

export const Logo = {
  Inline: LogoInline,
}
