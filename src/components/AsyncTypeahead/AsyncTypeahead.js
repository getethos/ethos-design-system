import React, { useState, useCallback, useEffect } from 'react'
import { NoOptions, Options } from '../Popover'
import PropTypes from 'prop-types'
import useScrollItemIntoView from '../../hooks/useScrollItemIntoView'
import usePopoverNavigation from '../../hooks/usePopoverNavigation'
import { useFetchEntities } from './useFetchEntities'
import styles from './AsyncTypeahead.module.scss'

/**
 * AsyncTypeahead is a component that allows you to make asynchronous API
 * fetches, and then use the results (entities) to show suggested results
 * as dropdown options. It debounces the captured input via the
 * `useFetchEntities` hook which takes in your dependency injected `fetchCallback`
 * allowing you to fetch for any arbitrary entity (be it Posts, Users, or whatever).
 * In order to be flexible in this way, it also takes in the `dataKey` to parse the
 * API data with e.g. if you a list of items and .name has the token you wish
 * to display in the dropdown results, you'd pass in `dataKey="name"`.
 *
 * @public
 *
 * @return {JSX.Element}
 */
export const AsyncTypeahead = ({
  renderInput,
  lastSelectedValue,
  dataKey,
  entitiesKey,
  onChange,
  fetchCallback,
  minChars = 1,
  placeholder = 'Search...',
}) => {
  let optionsRefs = []
  const [searchString, setSearchString] = useState('')
  const { entities, loading } = useFetchEntities({
    searchString,
    fetchEntities: fetchCallback,
    entitiesKey,
    delay: 300,
  })

  // Popover setup
  const [showPopover, setShowPopover] = useState(false)
  const [activeOption, setActiveOption] = useState(0)
  const [selectedOption, setSelectedOption] = useState(-1)
  const { scrollItemIntoView } = useScrollItemIntoView()
  const { handlePopoverNavigation } = usePopoverNavigation()

  /**
   * Has user typed min chars to show dropdown options
   */
  const hasMinChars = (inputValue) => {
    return inputValue.length >= minChars
  }

  /**
   * Sets state so that we'll show the dropdown options
   */
  const setShow = (e) => {
    const inputValue = e.target.value
    setShowPopover(hasMinChars(inputValue))
  }

  /**
   * Determines if the user's input value is shorter then the
   * currently selected value object.
   */
  const isSearchTermShorterThenSelectedValue = (inputValue) => {
    return (
      lastSelectedValue &&
      lastSelectedValue[dataKey] &&
      inputValue.length < lastSelectedValue[dataKey].length
    )
  }

  const handleInputChange = useCallback(
    (e) => {
      const inputValue = e.target.value
      setShowPopover(hasMinChars(inputValue))
      if (!isSearchTermShorterThenSelectedValue(inputValue)) {
        // For clearing selected input. Resets back to current search term
        setSearchString(inputValue)
      }
      onChange({})
    },
    [lastSelectedValue[dataKey]]
  )

  /**
   * Sets the selected options and also active option
   */
  const setSelectedAndActiveOptions = (index) => {
    setSelectedOption(index)
    setActiveOption(index)
  }

  /**
   * Sets up an array of dropdown option refs. These are needed for
   * keyboard navigation & scrolling items below container into view.
   * We do it here because useEffect with dependency of `entities`
   * will ensure our refs are consistent with those main entities.
   */
  useEffect(() => {
    optionsRefs = Array(entities.length)
      .fill(0)
      .map(() => React.createRef())
  }, [entities])

  /**
   * Gets our dropdown options to be rendered.
   */
  const getOptions = () => {
    // We're done loading, have our entities, and enough characters
    if (!loading && showPopover && entities) {
      return (
        <Options
          activeOption={activeOption}
          dataKey={dataKey}
          entities={entities}
          onChange={onChange}
          optionsRefs={optionsRefs}
          selectedOption={selectedOption}
          setSelectedAndActiveOptions={setSelectedAndActiveOptions}
        />
      )
    } else if (loading && showPopover) {
      return <NoOptions loadingText="Loading..." />
    }
  }

  return (
    <div className={styles.Container}>
      {renderInput({
        value: (lastSelectedValue || {})[dataKey] || searchString,
        onChange: handleInputChange,
        onFocus: setShow,
        onClick: setShow,
        onKeyDown: (ev) =>
          handlePopoverNavigation({
            ev,
            items: entities,
            onChange,
            optionsRefs,
            activeOption,
            setActiveOption,
            scrollItemIntoView,
            showPopover,
            setShowPopover,
            setSelectedAndActiveOptions,
          }),
        onBlur: () => setTimeout(() => setShowPopover(false), 200),
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
  /** `lastSelectedValue` - required object representing your last state */
  lastSelectedValue: PropTypes.object.isRequired,
  /** `onChange` - required callback for change events */
  onChange: PropTypes.func.isRequired,
  /** `dataKey` - key to indice each item in the fetched data by key */
  dataKey: PropTypes.string.isRequired,
  /** `entitiesKey` - key to indice the fetched data entities by key. Although optional, note that if you don't pass this in, we will assume the JSON is structured with entities at the top level. */
  entitiesKey: PropTypes.string,
  /** `minChars` - minimum number of characters required to before we'll show the dropdown option results */
  minChars: PropTypes.number,
  /** `placeholder` - placeholder text */
  placeholder: PropTypes.string,
}
