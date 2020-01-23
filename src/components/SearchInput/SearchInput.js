import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SearchInput.module.scss'
import textInputStyles from '../TextInput/TextInput.module.scss'

export const SearchInput = ({
  disabled = false,
  name,
  onEnter,
  placeholder = 'Search',
  ...rest
}) => {
  const [value, setValue] = useState('')
  const onKeyDown = (ev) => {
    if (['Enter'].includes(ev.key) || ev.keyCode === 27) {
      ev.preventDefault()
      onEnter(value)
    }
  }

  const onChange = (ev) => {
    const val = ev.target.value
    setValue(val)
  }

  return (
    <div className={styles.SearchIconContainer}>
      <input
        type="text"
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={textInputStyles.TextInput}
        value={value}
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
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onEnter: PropTypes.func,
}
