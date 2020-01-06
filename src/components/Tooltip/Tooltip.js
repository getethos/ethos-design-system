import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { useTransition, useSpring, animated } from 'react-spring'
import { Manager, Reference, Popper } from 'react-popper'

import { TitleLarge, Body, Footnote } from '../index'

import styles from './Tooltip.module.scss'

const AnimatedModalOverlay = animated(DialogOverlay)
const AnimatedModalContent = animated(DialogContent)

export const Tooltip = ({ label, placement, details, inline, children }) => {
  const [tooltipVisible, setTooltipVisibility] = useState(false)
  const [modalVisible, setModalVisibility] = useState(false)

  const animationConfig = {
    tension: 250,
    clamp: true,
  }

  const transitions = useTransition(modalVisible, null, {
    config: animationConfig,
    from: { opacity: 0, transform: 'translate3d(0px, -20px, 0px)' },
    enter: { opacity: 1, transform: 'translate3d(0px, 0px, 0px)' },
    leave: { opacity: 0, transform: 'translate3d(0px, -20px, 0px)' },
  })

  const renderModal = transitions.map(
    ({ item, key, props }) =>
      item && (
        <AnimatedModalOverlay
          key={key}
          style={{ opacity: props.opacity }}
          onDismiss={() => setModalVisibility(false)}
        >
          <AnimatedModalContent
            className={styles.mobileModal}
            aria-label={`${label} Tooltip`}
            style={props}
          >
            <button
              className={styles.closeButton}
              onClick={() => setModalVisibility(false)}
            >
              {Tooltip.SVGS.closeButton}
            </button>
            <div className={styles.label}>
              <TitleLarge.Sans.Regular400>{label}</TitleLarge.Sans.Regular400>
            </div>
            <Body.Regular400>{details}</Body.Regular400>
          </AnimatedModalContent>
        </AnimatedModalOverlay>
      )
  )

  const modifiers = {
    preventOverflow: {
      enabled: true,
    },
    flip: { enabled: true, boundariesElement: 'viewport', behavior: 'flip' },
  }

  const referenceProps = {
    onMouseOver: () => setTooltipVisibility(true),
    onMouseOut: () => {
      setTooltipVisibility(false), setModalVisibility(false)
    },
    onClick: () => setModalVisibility(true),
  }

  const popperProps = {
    placement,
    outOfBoundaries: true,
    modifiers,
  }

  const contentBoxClasses = [
    styles.contentBox,
    tooltipVisible ? styles.visible : styles.hidden,
  ]

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
            {({ ref, style, placement, arrowProps }) => (
              <div
                className={contentBoxClasses.join(' ')}
                ref={ref}
                style={style}
              >
                <Footnote.Regular400>{details}</Footnote.Regular400>
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
Tooltip.defaultProps = {
  placement: Tooltip.PLACEMENT_TYPES.TOP,
  inline: false,
}

Tooltip.propTypes = {
  placement: PropTypes.oneOf(Object.values(Tooltip.PLACEMENT_TYPES)),
  label: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  details: PropTypes.string.isRequired,
}

export default Tooltip
