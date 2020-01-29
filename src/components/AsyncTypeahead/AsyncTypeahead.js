import React, { useState, useCallback, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import { useFetchEntities } from './useFetchEntities.js'
import { codes } from '../../helpers/constants.js'
import styles from './AsyncTypeahead.module.scss'

/**
 * AsyncTypeahead is a component that allows you to make asynchronous API
 * fetches, and then use the results (entities) to show suggested results
 * as dropdown options. It debounces the captured input via the
 * `useFetchEntities` hook which takes in your dependency injected `fetchCallback`
 * allowing you to fetch for any arbitrary entity (be it Posts, Users, or whatever).
 * In order to be flexible in this way, it also takes in the `dataKey` to parse the
 * API data with e.g. if you have `data.items` you'd pass in `dataKey="items"`.
 *
 * @public
 *
 * @return {JSX.Element}
 */
export const AsyncTypeahead = ({
  renderInput,
  value,
  dataKey,
  onChange,
  fetchCallback,
  minChars = 1,
  placeholder = 'Search...',
}) => {
  // We keep a reference to the list of list items in the dropdown
  // This turns out to work better than creating a new ref for each
  // <li> and having to deal with them going null when React unmounts
  const optionsRef = useRef([])
  const [searchString, setSearchString] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [activeOption, setActiveOption] = useState(0)
  const [selectedOption, setSelectedOption] = useState(-1)

  /**
   * Note that useFetchEntities fetches the entities, but,
   * also attached refs to each entity for convenience
   */
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
    return value && value[dataKey] && inputValue.length < value[dataKey].length
  }

  const scrollItemIntoView = (entityIndex) => {
    const element = optionsRef.current[entityIndex]
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  const handleInputChange = useCallback(
    (e) => {
      const inputValue = e.target.value
      setShowOptions(hasMinChars(inputValue))
      if (!termIsLessThenValue(inputValue)) {
        // For Clearing Selected Input. Resets back to current search term
        setSearchString(inputValue)
      }
      onChange({})
    },
    [value[dataKey]]
  )

  const handleOnKeydown = (ev) => {
    switch (ev.keyCode) {
      case codes.SPACE:
      case codes.RETURN:
        // Call the consumer with the currently selected item so they can update
        // their state accordingly, and also dismiss the dropdown options
        setSelectedOption(activeOption)
        setShowOptions(false)
        onChange(entities[activeOption])
        scrollItemIntoView(activeOption)
        break
      case codes.UP:
        // New learning for me is that this is needed to prevent the cursor from
        // going back to the beginning of the input string which is a standard
        // feature within an html input
        ev.preventDefault()
        if (activeOption > 0) {
          const previous = activeOption - 1
          setActiveOption(previous)
          scrollItemIntoView(previous)
        }
        break
      case codes.DOWN:
        ev.preventDefault()
        // if options closed and we're attempting to trigger opening w/down arrow
        if (!showOptions) {
          setShowOptions(true)
        }
        if (activeOption < entities.length - 1) {
          const next = activeOption + 1
          setActiveOption(next)
          scrollItemIntoView(next)
        }
        break
      default:
        break
    }
  }

  /**
   * We don't want null values in the options ref array, so we use this
   * effect to keep the array length in sync with the entities.length
   */
  useEffect(() => {
    optionsRef.current = optionsRef.current.slice(0, entities.length)
  }, [entities])

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
            }
            // Note the if an item is both active (you've navigated to it)
            // and also selected (it was the previous selection), we want
            // both of those classes as that has it's own unique affordance.
            // See the AsyncTypeahead.module.scss for the details :)
            if (i === selectedOption) {
              className = `${className} ${styles.SelectedOption}`
            }
            return (
              <li key={uuidv4()} ref={(el) => (optionsRef.current[i] = el)}>
                <button
                  className={className}
                  onClick={() => {
                    setSelectedOption(activeOption)
                    onChange(item)
                  }}
                >
                  {item[dataKey]}
                </button>
              </li>
            )
          })}
        </ul>
      )
    } else if (loading && showOptions) {
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
        value: (value || {})[dataKey] || searchString,
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

/* @param {object} props -
 */
AsyncTypeahead.propTypes = {
  /** `renderInput` - The input component to use (likely `SearchInput`) */
  renderInput: PropTypes.func.isRequired,
  /** `fetchCallback` - required callback for fetching the entities */
  fetchCallback: PropTypes.func.isRequired,
  /** `onChange` - required callback for change events */
  onChange: PropTypes.func.isRequired,
  /** `dataKey` - key to indice the fetched data by */
  dataKey: PropTypes.string.isRequired,
  /** `value` - required object representing your last state */
  value: PropTypes.object.isRequired,
  /** `minChars` - minimum number of characters required to before we'll show the dropdown option results */
  minChars: PropTypes.number,
  /** `placeholder` - placeholder text */
  placeholder: PropTypes.string,
}
