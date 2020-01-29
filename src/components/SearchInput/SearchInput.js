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
  /** Required data-tid used as a unique id for targeting test selectors */
  'data-tid': PropTypes.string.isRequired,
  /** Name of the field */
  name: PropTypes.string.isRequired,
  /** `value` - value */
  value: PropTypes.string,
  /** `disabled` - whether to disable the search input */
  disabled: PropTypes.bool,
  /** `placeholder` - placeholder text */
  placeholder: PropTypes.string,
  /** `onFocus` - callback for focus events */
  onFocus: PropTypes.func,
  /** `onBlur` - callback for blur events */
  onBlur: PropTypes.func,
  /** `onChange` - callback for change events */
  onChange: PropTypes.func,
  /** `onKeyDown` - callback for keydown events */
  onKeyDown: PropTypes.func,
}
