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
  compact = false,
  name,
  value,
  onBlur,
  onFocus,
  onClick,
  onKeyDown,
  onChange,
  placeholder = 'Search',
  classOverrides,
  ...rest
}) => {
  const [lastValue, setLastValue] = useState('')
  const handleOnChange = (ev) => {
    const val = ev.target.value
    setLastValue(val)
    if (onChange) {
      onChange(ev)
    }
  }

  const getContainerClasses = () => {
    let classes = styles.SearchInputContainer
    if (compact) {
      classes = `${styles.SearchInputContainer} ${styles.SearchInputCompact}`
    }
    return classes
  }

  return (
    <div className={getContainerClasses()}>
      <input
        type="text"
        disabled={disabled}
        onBlur={onBlur}
        onChange={handleOnChange}
        onFocus={onFocus}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={textInputStyles.TextInput}
        value={value || lastValue}
        data-tid={rest['data-tid']}
        placeholder={placeholder}
        name={name}
      />
      <FontAwesomeIcon
        className={compact ? styles.SearchIconCompact : styles.SearchIcon}
        icon={['far', 'search']}
      />
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
  /** `compact` - whether input should be made more compact in height Search Input is a simple primitive. Please also see `AsyncTypeahead`.*/
  compact: PropTypes.bool,
  /** `disabled` - whether to disable the search input */
  disabled: PropTypes.bool,
  /** `placeholder` - placeholder text */
  placeholder: PropTypes.string,
  /** `onFocus` - callback for focus events */
  onFocus: PropTypes.func,
  /** `onClick` - callback for click events -- only meant for triggering dropdown to open*/
  onClick: PropTypes.func,
  /** `onBlur` - callback for blur events */
  onBlur: PropTypes.func,
  /** `onChange` - callback for change events */
  onChange: PropTypes.func,
  /** `onKeyDown` - callback for keydown events */
  onKeyDown: PropTypes.func,
  /** `classOverrides` - string of classes to apply to text input */
  classOverrides: PropTypes.string
}
