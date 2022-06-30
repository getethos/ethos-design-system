import React from 'react'
import PropTypes from 'prop-types'

export const Facade = ({ className }) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.75 12.127L3.623 9l-1.065 1.057L6.75 14.25l9-9-1.057-1.058-7.943 7.935z"
        fill="#fff"
      />
    </svg>
  )
}
Facade.propTypes = {
  className: PropTypes.string.isRequired,
}
