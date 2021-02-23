import React from 'react'
import PropTypes from 'prop-types'

/**
 * @private
 *
 * Required props:
 * @param {string} name
 * @param {string} 'data-tid'
 * @param {number} rows the native text area rows attribute (https://www.w3schools.com/tags/att_textarea_rows.asp)
 */

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
  rows,
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
      rows={rows}
      data-tid={rest['data-tid']}
    />
  )
}

BaseTextAreaInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  onPaste: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  'data-tid': PropTypes.string.isRequired,
}
