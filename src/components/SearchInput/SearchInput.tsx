import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { useState } from 'react'
import { PublicFormProps } from '../Form/Form'
import textInputStyles from '../TextInput/TextInput.module.scss'
import styles from './SearchInput.module.scss'
type SearchInputProps = PublicFormProps & {
  value?: string
  compact?: boolean
  disabled?: boolean
  placeholder?: string
  onFocus?: (...args: any[]) => any
  onClick?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onChange?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
}
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
export const SearchInput: React.SFC<SearchInputProps> = ({
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
