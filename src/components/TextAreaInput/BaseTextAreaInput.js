import React from 'react'
import PropTypes from 'prop-types'

export const BaseTextAreaInput = ({
  className,
  disabled,
  name,
  placeholder,
  onPaste,
  onBlur,
  onFocus,
  onChange,
  value,
  ...rest
}) => {
  return (
    <textarea
      className={className}
      disabled={disabled}
      name={name}
      placeholder={placeholder}
      onPaste={onPaste}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      data-tid={rest['data-tid']}
    />
  )
}

BaseTextAreaInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onPaste: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  'data-tid': PropTypes.string.isRequired,
}
