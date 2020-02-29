import React from 'react'
import PropTypes from 'prop-types'
import { TextAreaInput } from '../../../components/index'
import styles from './NoraTextAreaInput.module.scss'

export const NoraTextAreaInput = ({
  disabled,
  name,
  value,
  labelCopy,
  labelClassName,
  textClassName,
  placeholder,
  onBlur,
  onFocus,
  onChange,
  ...rest
}) => {
  return (
    <>
      {labelCopy && <p className={labelClassName}>{labelCopy}</p>}
      <BaseTextAreaInput
        className={textClassName}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        onPaste={onPaste}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        data-tid={rest['data-tid']}
      />
    </>
  )
}

NoraTextAreaInput.propTypes = {
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  labelCopy: PropTypes.string,
  labelClassName: PropTypes.string,
  textClassName: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
}
