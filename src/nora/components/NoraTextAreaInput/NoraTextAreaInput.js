import React from 'react'
import PropTypes from 'prop-types'

import { BaseTextAreaInput } from '../../../components/TextAreaInput/BaseTextAreaInput'
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
  const classes = [styles.NoraTextInput, textClassName].join(' ')
  return (
    <>
      {labelCopy && <label className={labelClassName}>{labelCopy}</label>}
      <BaseTextAreaInput
        className={classes}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
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
