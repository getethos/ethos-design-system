import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SearchInput.module.scss'
import textInputStyles from '../TextInput/TextInput.module.scss'

export const SearchInput = ({
  disabled = false,
  name,
  value,
  onBlur,
  onFocus,
  onKeyDown,
  onChange,
  placeholder = 'Search',
  ...rest
}) => {
  const [lastValue, setLastValue] = useState('')
  const handleOnChange = (ev) => {
    const val = ev.target.value
    console.log('SearchInput --> handleOnChange: ', val)
    setLastValue(val)
    if (onChange) {
      onChange(ev)
    }
  }

  return (
    <div className={styles.SearchIconContainer}>
      <input
        type="text"
        disabled={disabled}
        onBlur={onBlur}
        onChange={handleOnChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        className={textInputStyles.TextInput}
        value={value || lastValue}
        data-tid={rest['data-tid']}
        placeholder={placeholder}
        name={name}
      />
      <FontAwesomeIcon className={styles.SearchIcon} icon={['far', 'search']} />
    </div>
  )
}

SearchInput.propTypes = {
  'data-tid': PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
}
