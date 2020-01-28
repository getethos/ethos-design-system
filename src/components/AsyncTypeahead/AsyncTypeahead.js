import React, { useState, useCallback } from 'react'
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
 * allowing you to fetch for any entity (be it Posts, Users, or whatever).
 *
 * @public
 *
 * @param {object} props -
 * @param {React.Component} renderInput - The input component to use (likely `SearchInput`)
 * @param {function} fetchCallback - required callback for fetching the entities
 * @param {string} value - required value
 * @param {number} minChars - minimum number of characters required to before we'll show the dropdown option results
 * @param {string} placeholder - placeholder text
 *
 * @return {JSX.Element}
 */
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
    return value && value.name && inputValue.length < value.name.length
  }

  /**
   * TODO -- we need to refactor to take a key so instead of .name
   * we use [keyFromConsumer] to access the meaningful value. This way,
   * it can be .title, .id, .name, or whatever
   */
  const scrollItemIntoView = (item) => {
    if (item.ref.current == null) {
      return
    }

    item.ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
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

  const handleOnKeydown = (ev) => {
    switch (ev.keyCode) {
      case codes.SPACE:
      case codes.RETURN:
        // Call the consumer with the currently selected item so they can update
        // their state accordingly, and also dismiss the dropdown options
        setSelectedOption(activeOption)
        setShowOptions(false)
        onChange(entities[activeOption])
        scrollItemIntoView(entities[activeOption])
        break
      case codes.UP:
        // New learning for me is that this is needed to prevent the cursor from
        // going back to the beginning of the input string which is a standard
        // feature within an html input
        ev.preventDefault()
        if (activeOption > 0) {
          const previous = activeOption - 1
          setActiveOption(previous)
          scrollItemIntoView(entities[previous])
        }
        break
      case codes.DOWN:
        ev.preventDefault()
        // if options closed and we're attempting to trigger opening w/down arrow
        setShowOptions(true)
        if (activeOption < entities.length - 1) {
          const next = activeOption + 1
          setActiveOption(next)
          scrollItemIntoView(entities[next])
        }
        break
      case codes.PAGE_UP:
      case codes.PAGE_DOWN:
        console.log(
          'PAGE UP/DOWN not yet implemented...probably setSelection could work. Not sure if worth it'
        )
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
            }
            // Note the if an item is both active (you've navigated to it)
            // and also selected (it was the previous selection), we want
            // both of those classes as that has it's own unique affordance.
            // See the AsyncTypeahead.module.scss for the details :)
            if (i === selectedOption) {
              className = `${className} ${styles.SelectedOption}`
            }
            return (
              <li key={uuidv4()} ref={item.ref}>
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
