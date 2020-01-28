import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { useFetchEntities } from './useFetchEntities.js'
import styles from './AsyncTypeahead.module.scss'

export const AsyncTypeahead = ({
  renderInput,
  value,
  onChange,
  fetchCallback,
  minChars = 1,
  placeholder = 'Search...',
}) => {
  const [searchString, setSearchString] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const { entities, loading } = useFetchEntities({
    searchString,
    fetchEntities: fetchCallback,
    delay: 300,
  })

  const hasMinChars = (inputValue) => {
    return inputValue.length >= minChars
  }

  const setShow = (e) => {
    const inputValue = e.target.value
    setShowOptions(hasMinChars(inputValue))
  }

  /**
   * Determines if the user's input value is shorter then the
   * currently selected value.
   * @param {string} inputValue - the current user's input value
   */
  const termIsLessThenValue = (inputValue) => {
    return value && value.name && inputValue.length < value.name.length
  }

  const handleInputChange = useCallback(
    (e) => {
      setShow(e)

      const inputValue = e.target.value
      if (!termIsLessThenValue(inputValue)) {
        // For Clearing Selected Input. Resets back to current search term
        setSearchString(inputValue)
      }
      onChange({})
    },
    [value.name]
  )

  const getOptions = () => {
    // If we're done loading and they've typed enough characters
    if (!loading && showOptions) {
      return (
        <div
          data-testid="typeahead-options-container"
          className={styles.Options}
        >
          {entities &&
            entities.map((item, id) => (
              <div
                className={styles.Option}
                key={id}
                onClick={() => onChange(item)}
              >
                {item.name}
              </div>
            ))}
        </div>
      )
    } else if (loading && showOptions) {
      // still loading but enough characters
      return (
        <>
          <FontAwesomeIcon
            className={styles.Spin}
            icon={['far', 'circle-notch']}
          />
          <div
            data-testid="typeahead-no-options-container"
            className={styles.Options}
          >
            <div className={styles.Option}>Loading...</div>
          </div>
        </>
      )
    }
  }

  return (
    <div className={styles.Container}>
      {renderInput({
        className: styles.Input,
        value: (value || {}).name || searchString,
        onChange: handleInputChange,
        onFocus: setShow,
        onBlur: () => setTimeout(() => setShowOptions(false), 200),
        placeholder,
      })}
      {getOptions()}
    </div>
  )
}

AsyncTypeahead.propTypes = {
  renderInput: PropTypes.func.isRequired,
  fetchCallback: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  minChars: PropTypes.number,
  placeholder: PropTypes.string,
}
