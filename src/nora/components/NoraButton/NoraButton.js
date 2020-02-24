import React from 'react'
import PropTypes from 'prop-types'
import styles from './NoraButton.module.scss'

export const NoraButton = ({
  className,
  disabled,
  type,
  name,
  onClick,
  role,
  children,
  ...rest
}) => {
  const cssClasses = [styles.Button, className].join(' ')
  return (
    <button
      className={cssClasses}
      disabled={disabled}
      type={type}
      name={name}
      onClick={onClick}
      data-tid={rest['data-tid']}
      role={role}
    >
      {children}
    </button>
  )
}

NoraButton.propTypes = {
  children: PropTypes.string,
  'data-tid': PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit']), // See Button.js for explanation of these two types
  name: PropTypes.string,
  onClick: PropTypes.func,
  role: PropTypes.string,
  className: PropTypes.string,
}
