import debounce from 'lodash.debounce'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import usePrevious from '../../hooks/usePrevious'
import { Media } from '../Media/Media'
import { Footnote } from '../Type'
import styles from './Tooltip.module.scss'
const BREAKPOINTS = Media.BREAKPOINTS
const HEADER_ID = 'mobile-modal-heading'
const DESC_ID = 'mobile-modal-description'
type PopperContentProps = {
  innerRef?: React.Ref<any>
  visible?: boolean
  style?: { transform?: any }
  popperBoxStyles?: string
  placement?: string
  arrowProps?: { ref?: any; style?: any }
  scheduleUpdate: (...args: any[]) => any
  details?: string
}
export const PopperContent: React.FC<PopperContentProps> = ({
  innerRef,
  visible,
  style = {},
  popperBoxStyles = '',
  placement,
  arrowProps = {},
  scheduleUpdate,
  details,
}) => {
  const [isPositioned, setIsPositioned] = useState(false)
  const prevVisible = usePrevious(visible)
  const prevPosition = usePrevious(style.transform)
  const position = style.transform || ''
  const debouncedScheduleUpdate = useRef(
    debounce(
      () => {
        scheduleUpdate()
      },
      1000,
      { trailing: true }
    )
  ).current
  useEffect(() => {
    window.addEventListener('scroll', debouncedScheduleUpdate)
    return () => {
      window.removeEventListener('scroll', debouncedScheduleUpdate)
    }
  }, [position])
  const contentBoxClasses = [
    popperBoxStyles,
    styles.popperContentBox,
    visible && isPositioned ? styles.visible : styles.hidden,
  ]
  // On first reveal of tooltip, schedule an update so positioning
  // is correct incase the DOM has shuffled since the page first loaded
  if (prevVisible === false && visible === true && !isPositioned) {
    setIsPositioned(true)
    scheduleUpdate()
    return null
  }
  // Check Tooltip Positioning, remove transition if repositioning is necessary
  if (prevPosition !== position) {
    contentBoxClasses.push(styles.noTransition)
  }
  return (
    <div className={contentBoxClasses.join(' ')} ref={innerRef} style={style}>
      <Footnote.Regular400>{details}</Footnote.Regular400>
      <div
        ref={arrowProps.ref}
        className={styles.arrow}
        style={arrowProps.style}
        data-placement={placement}
      />
    </div>
  )
}
