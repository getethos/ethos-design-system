import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { useTransition, animated } from 'react-spring'
import { Manager, Reference, Popper } from 'react-popper'

import { TitleLarge, Body, Footnote } from '../index'

import styles from './Tooltip.module.scss'

let AnimatedDialogOverlay = animated(DialogOverlay)
let AnimatedDialogContent = animated(DialogContent)

export const Tooltip = ({ label, placement, behavior, children }) => {
  const [visibleFromHover, setVisibilityFromHover] = useState(false)
  const [visibleFromClick, setVisibilityFromClick] = useState(false)

  const transitions = useTransition(visibleFromClick, null, {
    from: { opacity: 0, transform: 'translate3d(0px, -50px, 0px)' },
    enter: { opacity: 1, transform: 'translate3d(0px, 0px, 0px)' },
    leave: { opacity: 0, transform: 'translate3d(0px, -50px, 0px)' },
  })

  const renderMobileModal = transitions.map(
    ({ item, key, props }) =>
      item && (
        <AnimatedDialogOverlay
          key={key}
          style={{ opacity: props.opacity }}
          onDismiss={() => setVisibilityFromClick(false)}
        >
          <AnimatedDialogContent
            className={styles.mobileModal}
            aria-label={`${label} Tooltip`}
            style={props}
          >
            <button
              className={styles.closeButton}
              onClick={() => setVisibilityFromClick(false)}
            >
              {Tooltip.SVGS.closeButton}
            </button>
            <div className={styles.label}>
              <TitleLarge.Sans.Regular400>{label}</TitleLarge.Sans.Regular400>
            </div>
            <Body.Regular400>{children}</Body.Regular400>
          </AnimatedDialogContent>
        </AnimatedDialogOverlay>
      )
  )

  const modifiers = {
    preventOverflow: {
      enabled: true,
    },
    flip: { enabled: true, boundariesElement: 'viewport', behavior: 'flip' },
  }

  const referenceProps = {
    onMouseOver: () => setVisibilityFromHover(true),
    onMouseOut: () => setVisibilityFromHover(false),
    onClick: () => setVisibilityFromClick(true),
  }

  const popperProps = {
    placement,
    outOfBoundaries: true,
    modifiers,
  }

  const contentBoxClasses = [
    styles.contentBox,
    visibleFromHover ? styles.visible : styles.hidden,
  ]

  const renderTooltip = (
    <div className={styles.root}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <div className={styles.icon} ref={ref} {...referenceProps}>
              {visibleFromHover
                ? Tooltip.SVGS.iconHover
                : Tooltip.SVGS.iconStatic}
            </div>
          )}
        </Reference>
        <div className={styles.popperContainer}>
          <Popper {...popperProps}>
            {({ ref, style, placement, arrowProps }) => (
              <div
                className={contentBoxClasses.join(' ')}
                ref={ref}
                style={style}
              >
                <Footnote.Regular400>{children}</Footnote.Regular400>
                <div
                  ref={arrowProps.ref}
                  className={styles.arrow}
                  style={arrowProps.style}
                  data-placement={placement}
                />
              </div>
            )}
          </Popper>
        </div>
      </Manager>
    </div>
  )

  return (
    <>
      {renderMobileModal}
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
  iconStatic: (
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
Tooltip.defaultProps = {
  placement: Tooltip.PLACEMENT_TYPES.TOP,
}

Tooltip.propTypes = {
  placement: PropTypes.oneOf(Object.values(Tooltip.PLACEMENT_TYPES)),
  label: PropTypes.string.isRequired,
}

export default Tooltip
