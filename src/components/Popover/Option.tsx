import * as React from 'react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import scrollToParentTop from '../../helpers/scrollToParentTop.js'
import styles from './Option.module.scss'
type OptionProps = {
  currentActive: number
  itemIndex: number
  item: object
  dataKey: string
  selectedOption: number
  setSelectedAndActiveOptions: (...args: any[]) => any
  onChange: (...args: any[]) => any
}
/**
 * Represents a single option item e.g. `<li>..</li>`. See propTypes for details.
 */
export const Option = forwardRef<HTMLLIElement, OptionProps>(
  (props, forwardedRef) => {
    const innerRef = useRef<HTMLLIElement>(null)
    const {
      currentActive,
      itemIndex,
      item,
      dataKey,
      selectedOption,
      setSelectedAndActiveOptions,
      onChange,
    } = props
    // ethan - not sure how to fix this ts error
    // @ts-ignore
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
  }
)
Option.displayName = 'Option'
