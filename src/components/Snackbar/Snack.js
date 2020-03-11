import React from 'react'
import PropTypes from 'prop-types'

export const Snack = ({ classNameSkin, children }) => {
  return <div className={classNameSkin}>{children}</div>
}
Snack.propTypes = {
  classNameSkin: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
