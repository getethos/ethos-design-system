import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Manager, Reference, Popper } from 'react-popper'

import debounce from 'lodash.debounce'

import { TitleLarge, Body, Footnote } from '../index'
import { Media } from '../Media/Media'
import { Modal } from '../Modal/Modal'
import usePrevious from '../../hooks/usePrevious'

import styles from './Tooltip.module.scss'

const BREAKPOINTS = Media.BREAKPOINTS
const HEADER_ID = 'mobile-modal-heading'
const DESC_ID = 'mobile-modal-description'

export const Tooltip = ({
  label,
  placement,
  details,
  inline,
  children,
  boundariesElement,
}) => {
  const [tooltipVisible, setTooltipVisibility] = useState(false)
  const [modalVisible, setModalVisibility] = useState(false)
  const debouncedSetTooltipVisibility = debounce(
    (visibility) => setTooltipVisibility(visibility),
    300,
    {
      trailing: true,
    }
  )

  const isMobile = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(`(max-width: ${BREAKPOINTS.PHONE_RANGE_END}px`)
      .matches
  }

  const renderModal = (
    <>
      <Modal
        isOpen={modalVisible}
        onDismiss={setModalVisibility}
        ariaLabelledBy={HEADER_ID}
        ariaDescribedBy={DESC_ID}
      >
        <div className={styles.mobileModal}>
          <div className={styles.label}>
            <TitleLarge.Sans.Regular400 id={HEADER_ID}>
              {label}
            </TitleLarge.Sans.Regular400>
          </div>
          <Body.Regular400 id={DESC_ID}>{details}</Body.Regular400>
          <button
            className={styles.closeButton}
            onClick={() => setModalVisibility(false)}
          >
            {Tooltip.SVGS.closeButton}
          </button>
        </div>
      </Modal>
    </>
  )

  const modifiers = {
    preventOverflow: {
      enabled: true,
      boundariesElement,
    },
    flip: { enabled: true, behavior: 'flip' },
  }

  const referenceProps = {
    onMouseOver: () => debouncedSetTooltipVisibility(true),
    onMouseOut: () => debouncedSetTooltipVisibility(false),
    onClick: () => setModalVisibility(true),
  }

  const popperProps = {
    placement,
    outOfBoundaries: true,
    modifiers,
    eventsEnabled: true,
  }

  const tooltipClasses = [styles.root, inline ? styles.inline : styles.block]

  const renderTooltip = (
    <div className={tooltipClasses.join(' ')}>
      <Manager>
        <Reference>
          {({ ref }) =>
            children ? (
              <div ref={ref} {...referenceProps}>
                {children}
              </div>
            ) : (
              <div className={styles.icon} ref={ref} {...referenceProps}>
                {tooltipVisible ? Tooltip.SVGS.iconHover : Tooltip.SVGS.icon}
              </div>
            )
          }
        </Reference>
        <div className={styles.popperContainer}>
          <Popper {...popperProps}>
            {({ ref, ...rest }) => (
              <PopperContent
                innerRef={ref}
                visible={tooltipVisible}
                details={details}
                {...rest}
              />
            )}
          </Popper>
        </div>
      </Manager>
    </div>
  )

  return (
    <>
      {isMobile() && renderModal}
      {renderTooltip}
    </>
  )
}

const PopperContent = ({
  innerRef,
  visible,
  style,
  placement,
  arrowProps,
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
    styles.contentBox,
    visible && isPositioned ? styles.visible : styles.hidden,
  ]

  // On first reveal of tooltip, schedule an update so positioning
  // is correct incase the DOM has shuffled since the page first loaded
  if (prevVisible === false && visible === true && !isPositioned) {
    setIsPositioned(true)
    scheduleUpdate()
    return
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

Tooltip.SVGS = {
  closeButton: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
        fill="black"
      />
    </svg>
  ),
  iconHover: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00064 1.33203C4.32065 1.33203 1.33398 4.31869 1.33398 7.99868C1.33398 11.6787 4.32065 14.6653 8.00064 14.6653C11.6806 14.6653 14.6673 11.6787 14.6673 7.99868C14.6673 4.31869 11.6806 1.33203 8.00064 1.33203ZM8.66731 11.332H7.33398V7.33202H8.66731V11.332ZM8.66731 5.99869H7.33398V4.66536H8.66731V5.99869Z"
        fill="black"
        fillOpacity={'1'}
      />
    </svg>
  ),
  icon: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00064 1.33203C4.32065 1.33203 1.33398 4.31869 1.33398 7.99868C1.33398 11.6787 4.32065 14.6653 8.00064 14.6653C11.6806 14.6653 14.6673 11.6787 14.6673 7.99868C14.6673 4.31869 11.6806 1.33203 8.00064 1.33203ZM8.66731 11.332H7.33398V7.33202H8.66731V11.332ZM8.66731 5.99869H7.33398V4.66536H8.66731V5.99869Z"
        fill="black"
        fillOpacity={'0.2'}
      />
    </svg>
  ),
}

Tooltip.PLACEMENT_TYPES = {
  TOP: 'top',
  RIGHT: 'right',
  LEFT: 'left',
  BOTTOM: 'bottom',
  AUTO: 'auto',
}

Tooltip.BOUNDARIES_ELEMENT = {
  VIEWPORT: 'viewport',
  SCROLL_PARENT: 'scrollParent',
  WINDOW: 'window',
}

Tooltip.defaultProps = {
  placement: Tooltip.PLACEMENT_TYPES.TOP,
  inline: false,
  boundariesElement: Tooltip.BOUNDARIES_ELEMENT.SCROLL_PARENT,
}

Tooltip.propTypes = {
  /** String indicating starting placement of Tooltip on hover, can be `'top'`, `'right'`, `'left'`,`'bottom'` or `'auto'` */
  placement: PropTypes.oneOf(Object.values(Tooltip.PLACEMENT_TYPES)),
  /** Label used for Mobile modal Header */
  label: PropTypes.string.isRequired,
  /** Boolean used to change Tooltip reference element to `display: inline-block;` */
  inline: PropTypes.bool,
  /** Tooltip description */
  details: PropTypes.string.isRequired,
  /** String that sets what Element the tooltip events should trigger against, can be `'viewport'`, `'scrollParent'` or`'window'`*/
  boundariesElement: PropTypes.oneOf(Object.values(Tooltip.BOUNDARIES_ELEMENT)),
}

export default Tooltip
