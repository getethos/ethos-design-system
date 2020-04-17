import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'
import scrollToParentTop from '../../helpers/scrollToParentTop.js'
import styles from './Option.module.scss'

/**
 * A single option item e.g. <li>..</li>
 * @param {object} props -- the props
 * @param {int} forwardedRef - TBD
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
  currentActive: PropTypes.number,
  itemIndex: PropTypes.number,
  item: PropTypes.object,
  dataKey: PropTypes.string,
  selectedOption: PropTypes.number,
  setSelectedAndActiveOptions: PropTypes.func,
  onChange: PropTypes.func,
}
