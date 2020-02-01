import React, {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import scrollToParentTop from '../../helpers/scrollToParentTop.js'
import { useFetchEntities } from './useFetchEntities.js'
import { codes } from '../../helpers/constants.js'
import styles from './AsyncTypeahead.module.scss'

const Item = forwardRef((props, forwardedRef) => {
  const innerRef = useRef()
  const {
    currentActive,
    itemIndex,
    item,
    dataKey,
    selectedOption,
    setSelectedOptionDelegate,
    onChange,
  } = props
  useImperativeHandle(forwardedRef, () => ({
    scrollToTop: () => {
      scrollToParentTop(innerRef.current)
    },
  }))

  let className = styles.Option

  if (itemIndex === currentActive) {
    className = `${className} ${styles.ActiveOption}`
  }
  // Note the if an item is both active (you've navigated to it)
  // and also selected (it was the previous selection), we want
  // both of those classes as that has it's own unique affordance.
  // See the AsyncTypeahead.module.scss for the details :)
  if (itemIndex === selectedOption) {
    className = `${className} ${styles.SelectedOption}`
  }
  return (
    <li ref={innerRef}>
      <button
        className={className}
        onClick={() => {
          setSelectedOptionDelegate(itemIndex)
          onChange(item)
        }}
      >
        {item[dataKey]}
      </button>
    </li>
  )
})
Item.displayName = 'Item'
Item.propTypes = {
  currentActive: PropTypes.number,
  itemIndex: PropTypes.number,
  item: PropTypes.object,
  dataKey: PropTypes.string,
  selectedOption: PropTypes.number,
  setSelectedOptionDelegate: PropTypes.func,
  onChange: PropTypes.func,
}

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
  const [showOptions, setShowOptions] = useState(false)
  const [activeOption, setActiveOption] = useState(0)
  const [selectedOption, setSelectedOption] = useState(-1)

  const { entities, loading } = useFetchEntities({
    searchString,
    fetchEntities: fetchCallback,
    entitiesKey,
    delay: 300,
  })

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
    setShowOptions(hasMinChars(inputValue))
  }

  /**
   * Sets the selected options and also active option
   */
  const setSelectedOptionDelegate = (index) => {
    setSelectedOption(index)
    setActiveOption(index)
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

  /**
   * Used to scroll dropdown option in to view if it's hidden
   */
  const scrollItemIntoView = (entityIndex) => {
    /**
     * This is here to account for when React unmounts our ref
     */
    if (
      !optionsRefs ||
      !optionsRefs[entityIndex || !optionsRefs[entityIndex]]
    ) {
      return
    }
    // Here we call the method defined in useImperativeHandle within Item
    const itemEl = optionsRefs[entityIndex].current
    itemEl.scrollToTop()
  }

  const handleInputChange = useCallback(
    (e) => {
      const inputValue = e.target.value
      setShowOptions(hasMinChars(inputValue))
      if (!isSearchTermShorterThenSelectedValue(inputValue)) {
        // For clearing selected input. Resets back to current search term
        setSearchString(inputValue)
      }
      onChange({})
    },
    [lastSelectedValue[dataKey]]
  )

  /**
   * Handles keydown events so we can navigate via tabs and arrows
   */
  const handleOnKeydown = (ev) => {
    switch (ev.keyCode) {
      case codes.SPACE:
      case codes.RETURN:
        // Call the consumer with the currently selected item so they can update
        // their state accordingly, and also dismiss the dropdown options
        setSelectedOptionDelegate(activeOption)
        setShowOptions(false)
        onChange(entities[activeOption])
        scrollItemIntoView(activeOption)
        break
      case codes.UP:
        // Prevents input cursor from jumping
        ev.preventDefault()
        if (activeOption > 0) {
          const previous = activeOption - 1
          setActiveOption(previous)
          scrollItemIntoView(previous)
        }
        break
      case codes.DOWN:
        // Prevents input cursor from jumping
        ev.preventDefault()
        // if options closed and we're attempting to trigger opening w/down arrow
        if (!showOptions) {
          setShowOptions(true)
        }
        if (activeOption < entities.length - 1) {
          const next = activeOption + 1
          setActiveOption(next)
          scrollItemIntoView(next)
        } else {
          // On last item so circle back around to topmost item
          setActiveOption(0)
          scrollItemIntoView(0)
        }
        break
      default:
        break
    }
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
    if (!loading && showOptions && entities) {
      return (
        <ul
          data-testid="typeahead-options-container"
          className={styles.Options}
        >
          {entities.map((item, i) => {
            optionsRefs[i] = React.createRef()
            return (
              <Item
                selectedOption={selectedOption}
                setSelectedOptionDelegate={setSelectedOptionDelegate}
                onChange={onChange}
                currentActive={activeOption}
                item={item}
                itemIndex={i}
                dataKey={dataKey}
                key={uuidv4()}
                ref={optionsRefs[i]}
              />
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
        value: (lastSelectedValue || {})[dataKey] || searchString,
        onChange: handleInputChange,
        onFocus: setShow,
        onClick: setShow,
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
