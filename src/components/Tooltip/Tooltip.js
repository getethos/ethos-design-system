import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import {} from '../index'
import { Manager, Reference, Popper } from 'react-popper'

import styles from './Tooltip.module.scss'

export const Tooltip = ({ placement, behavior }) => {
  const [visible, setVisible] = useState(false)

  const modifiers = {
    preventOverflow: {
      enabled: true,
    },
    [behavior]: Tooltip.BEHAVIOR_TYPES[behavior],
  }

  const onHover = (visibility) => {
    return () => setVisible(visibility)
  }

  const tooltipStyle = {
    opacity: visible ? '1' : '0',
  }

  const referenceProps = {
    onMouseOver: onHover(true),
    onMouseOut: onHover(false),
  }

  const popperProps = {
    placement,
    outOfBoundaries: true,
    modifiers,
  }

  return (
    <div className={styles.root}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <div className={styles.icon} ref={ref} {...referenceProps}>
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
                  fill-opacity={visible ? '1' : '0.2'}
                />
              </svg>
            </div>
          )}
        </Reference>
        <div className={styles.container}>
          <Popper {...popperProps}>
            {({ ref, style, placement, arrowProps }) => (
              <div
                className={styles.box}
                ref={ref}
                style={Object.assign({}, tooltipStyle, style)}
              >
                Popper element
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
}

Tooltip.PLACEMENT_TYPES = {
  TOP: 'top',
  RIGHT: 'right',
  LEFT: 'left',
  BOTTOM: 'bottom',
  AUTO: 'auto',
}

Tooltip.BEHAVIOR_TYPES = {
  flip: { enabled: true, boundariesElement: 'viewport', behavior: 'flip' },
}

Tooltip.defaultProps = {
  placement: Tooltip.PLACEMENT_TYPES.TOP,
  behavior: 'flip',
}

Tooltip.propTypes = {
  placement: PropTypes.oneOf(Object.values(Tooltip.PLACEMENT_TYPES)),
  behavior: PropTypes.oneOf(Object.keys(Tooltip.BEHAVIOR_TYPES)),
}

export default Tooltip
