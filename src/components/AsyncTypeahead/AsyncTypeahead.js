import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
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
  const [activeOption, setActiveOption] = useState(0)
  const [selectedOption, setSelectedOption] = useState(-1)
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
      console.log('AsyncTypeahead --> handleOnChange: ', e.target.value)
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

  const handleOnKeydown = (ev) => {
    const codes = {
      RETURN: 13,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      UP: 38,
      DOWN: 40,
    }
    switch (ev.keyCode) {
      case codes.SPACE:
      case codes.RETURN:
        console.log('select activeOption as selectedValue not yet implemented')
        // Call the consumer with the currently selected item so they can
        // update their state accordingly, and dismiss the options
        onChange(entities[activeOption])
        setSelectedOption(activeOption)
        setShowOptions(false)
        break
      case codes.UP:
        console.log('Should navigate up...')
        if (activeOption >= 0) {
          setActiveOption(activeOption - 1)
        }
        break
      case codes.DOWN:
        console.log('Should navigate down...')
        // if options closed and we're attempting to trigger opening w/down arrow
        setShowOptions(true)
        if (activeOption < entities.length - 1) {
          setActiveOption(activeOption + 1)
        }
        break
      case codes.PAGE_UP:
      case codes.PAGE_DOWN:
        console.log('PAGE UP/DOWN not yet implemented...')
        break
      default:
        break
    }
  }

  const getOptions = () => {
    // If we're done loading and they've typed enough characters
    if (!loading && showOptions && entities) {
      return (
        <ul
          data-testid="typeahead-options-container"
          className={styles.Options}
        >
          {entities.map((item, i) => {
            let className = styles.Option
            if (i === activeOption) {
              className = `${className} ${styles.ActiveOption}`
            } else if (i === selectedOption) {
              className = `${className} ${styles.SelectedOption}`
            }
            return (
              <li key={uuidv4()}>
                <button
                  className={className}
                  onClick={() => {
                    setSelectedOption(activeOption)
                    onChange(item)
                  }}
                >
                  {item.name}
                </button>
              </li>
            )
          })}
        </ul>
      )
    } else if (loading && showOptions) {
      // still loading but enough characters
      return (
        <>
          <FontAwesomeIcon
            className={styles.Spin}
            icon={['far', 'circle-notch']}
          />
          <ul
            data-testid="typeahead-no-options-container"
            className={styles.Options}
          >
            <li className={styles.Option}>Loading...</li>
          </ul>
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
        onKeyDown: handleOnKeydown,
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
