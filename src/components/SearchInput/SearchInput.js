import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SearchInput.module.scss'
import textInputStyles from '../TextInput/TextInput.module.scss'

/**
 * SearchInput is a primitive input with a search magnifying glass
 * icon to the left. It's meant to be used as a simple primitive
 * along with `AsyncTypeahead` (likely what you want to go look at)
 *
 * See also:
 * @see src/components/AsyncTypeahead/AsyncTypeahead.js
 *
 * @public
 *
 * @param {object} props -
 * @param {boolean} disabled - whether to disable or not
 * @param {string} data-tid - required test id for the component
 * @param {string} name - required name of component
 * @param {string} value - value
 * @param {function} onBlur - onBlur callback
 * @param {function} onFocus - onFocus callback
 * @param {function} onKeyDown - onKeyDown callback
 * @param {function} onChange - onChange callback
 * @param {string} placeholder - placeholder text
 *
 * @return {JSX.Element}
 */
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
    <div className={styles.SearchInputContainer}>
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
