import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'
import scrollToParentTop from '../../helpers/scrollToParentTop.js'
import styles from './Option.module.scss'

/**
 * Represents a single option item e.g. `<li>..</li>`. See propTypes for details.
 */
export const Option = forwardRef((props, forwardedRef) => {
  const innerRef = useRef()
  const {
    currentActive,
    itemIndex,
    item,
    dataKey,
    selectedOption,
    setSelectedAndActiveOptions,
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
          setSelectedAndActiveOptions(itemIndex)
          onChange(item)
        }}
      >
        {item[dataKey]}
      </button>
    </li>
  )
})
Option.displayName = 'Option'
Option.propTypes = {
  /** The currently active option item. This is the item that is currently
   * being focused on (but not necessarily selected yet!) */
  currentActive: PropTypes.number.isRequired,
  /** The option item's index in the options */
  itemIndex: PropTypes.number.isRequired,
  /** The data object with the data for this option via the `dataKey` */
  item: PropTypes.object.isRequired,
  /** The key to access via `item` e.g. `item.name` */
  dataKey: PropTypes.string.isRequired,
  /** The currently selected option item. Unlike an active item, this signifies
      that the user has actually selected or chosen this item. Of course an
      item can be both active and selected. */
  selectedOption: PropTypes.number.isRequired,
  /** Callback that gets called once an option is selected */
  setSelectedAndActiveOptions: PropTypes.func.isRequired,
  /** Callback that gets called on change */
  onChange: PropTypes.func.isRequired,
}
