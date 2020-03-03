import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Icon = ({ iconPrefix, iconName, className }) => {
  return (
    <FontAwesomeIcon className={className} icon={[iconPrefix, iconName]} />
  )
}

Icon.propTypes = {
  iconPrefix: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
}
