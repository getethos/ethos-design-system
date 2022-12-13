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
  popperBoxStyles = '',
  details,
  inline,
  noLayout,
  className,
  children,
  boundariesElement,
  softCorners,
  trackingFunction,
}) => {
  const [analyticsFired, setAnalyticsFired] = useState(false)
  const [tooltipVisible, setTooltipVisibility] = useState(false)
  const [modalVisible, setModalVisibility] = useState(false)
  const debouncedSetTooltipVisibility = debounce(
    (visibility) => {
      setTooltipVisibility(visibility)
      if (trackingFunction && visibility && !analyticsFired) {
        trackingFunction()
        setAnalyticsFired(true)
      }
    },
    300,
    {
      trailing: true,
    }
  )

  const isMobile = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(`(max-width: ${BREAKPOINTS.PHONE_RANGE_END}px)`)
      .matches
  }

  const modalStyle = [styles.mobileModal, softCorners ? styles.softCorners : '']

  const renderModal = (
    <div>
      <Modal
        isOpen={isMobile() ? modalVisible : false}
        onDismiss={setModalVisibility}
        ariaLabelledBy={HEADER_ID}
        ariaDescribedBy={DESC_ID}
      >
        <div className={modalStyle.join(' ')}>
          <div className={styles.label}>
            <TitleLarge.Sans.Regular400 id={HEADER_ID}>
              {label}
            </TitleLarge.Sans.Regular400>
          </div>
          <Body.Regular400 id={DESC_ID}>{details}</Body.Regular400>
          <ModalCloseButtton
            softCorners={softCorners}
            onClick={() => setModalVisibility(false)}
          />
        </div>
      </Modal>
    </div>
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
    softCorners,
  }

  const tooltipClasses = [
    styles.root,
    inline ? styles.inline : noLayout ? '' : styles.block,
    className,
  ]

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
                popperBoxStyles={popperBoxStyles}
                softCorners={softCorners}
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
      {renderModal}
      {renderTooltip}
    </>
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
  closeButtonCircle: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="#F5F5F5" />
      <path
        d="M17.0606 16L20.2656 12.795L20.9266 12.1341C21.0241 12.0366 21.0241 11.8781 20.9266 11.7806L20.2194 11.0734C20.1219 10.9759 19.9634 10.9759 19.8659 11.0734L16 14.9394L12.1341 11.0731C12.0366 10.9756 11.8781 10.9756 11.7806 11.0731L11.0731 11.7803C10.9756 11.8778 10.9756 12.0363 11.0731 12.1338L14.9394 16L11.0731 19.8659C10.9756 19.9634 10.9756 20.1219 11.0731 20.2194L11.7803 20.9266C11.8778 21.0241 12.0362 21.0241 12.1337 20.9266L16 17.0606L19.205 20.2656L19.8659 20.9266C19.9634 21.0241 20.1219 21.0241 20.2194 20.9266L20.9266 20.2194C21.0241 20.1219 21.0241 19.9634 20.9266 19.8659L17.0606 16Z"
        fill="#727272"
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
  softCorners: false,
}

Tooltip.propTypes = {
  /** String indicating starting placement of Tooltip on hover, can be `'top'`, `'right'`, `'left'`,`'bottom'` or `'auto'` */
  placement: PropTypes.oneOf(Object.values(Tooltip.PLACEMENT_TYPES)),
  /** Label used for Mobile modal Header */
  label: PropTypes.string.isRequired,
  /** Boolean used to change Tooltip reference element to `display: inline-block;` */
  inline: PropTypes.bool,
  /** Boolean used to change Tooltip reference element to not "display" anything */
  noLayout: PropTypes.bool,
  /** String for overriding default tooltip box styles. You can, for example override the white background color with this. */
  popperBoxStyles: PropTypes.string,
  /** Tooltip description */
  details: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  /** String that sets what Element the tooltip events should trigger against, can be `'viewport'`, `'scrollParent'` or`'window'`*/
  boundariesElement: PropTypes.oneOf(Object.values(Tooltip.BOUNDARIES_ELEMENT)),
  /** The Modal's children */
  children: PropTypes.node,
  /** Classes to apply to root element */
  className: PropTypes.string,
  /** Indicates whether to use soft edges*/
  softCorners: PropTypes.bool,
  /** Tracking function */
  trackingFunction: PropTypes.func,
}

const PopperContent = ({
  innerRef,
  visible,
  style,
  popperBoxStyles = '',
  placement,
  arrowProps,
  scheduleUpdate,
  details,
  softCorners,
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
    softCorners ? styles.softCorners : '',
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

PopperContent.propTypes = {
  innerRef: PropTypes.func,
  visible: PropTypes.bool,
  style: PropTypes.object,
  popperBoxStyles: PropTypes.string,
  placement: PropTypes.string,
  arrowProps: PropTypes.object,
  scheduleUpdate: PropTypes.func,
  details: PropTypes.string | PropTypes.element,
  softCorners: PropTypes.bool,
}

const ModalCloseButtton = ({ softCorners, onClick }) => {
  const closeButtonClassName = softCorners
    ? styles.closeButtonCircle
    : styles.closeButton

  return (
    <button className={closeButtonClassName} onClick={onClick}>
      {softCorners && Tooltip.SVGS.closeButtonCircle}
      {!softCorners && Tooltip.SVGS.closeButton}
    </button>
  )
}

ModalCloseButtton.propTypes = {
  softCorners: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Tooltip
