import debounce from 'lodash.debounce'
import { Modifiers } from 'popper.js'
import * as React from 'react'
import { useState } from 'react'
import { Manager, Popper, PopperProps, Reference } from 'react-popper'
import { Body } from '../Body'
import { Media } from '../Media/Media'
import { Modal } from '../Modal/Modal'
import { TitleLarge } from '../Type/TitleLarge'
import { PopperContent } from './PopperContent'
import styles from './Tooltip.module.scss'
const BREAKPOINTS = Media.BREAKPOINTS
const HEADER_ID = 'mobile-modal-heading'
const DESC_ID = 'mobile-modal-description'
const PLACEMENT_TYPES = {
  TOP: 'top',
  RIGHT: 'right',
  LEFT: 'left',
  BOTTOM: 'bottom',
  AUTO: 'auto',
}
const BOUNDARIES_ELEMENT = {
  VIEWPORT: 'viewport',
  SCROLL_PARENT: 'scrollParent',
  WINDOW: 'window',
}
const SVGS = {
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
type TooltipProps = {
  placement?: any
  label: string
  inline?: boolean
  noLayout?: boolean
  popperBoxStyles?: string
  details: string
  boundariesElement?: any
  className?: string
}
export const Tooltip: React.SFC<TooltipProps> & {
  PLACEMENT_TYPES: typeof PLACEMENT_TYPES
  BOUNDARIES_ELEMENT: typeof BOUNDARIES_ELEMENT
  SVGS: typeof SVGS
} = ({
  label,
  placement,
  popperBoxStyles = '',
  details,
  inline,
  noLayout,
  className,
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
    return window.matchMedia(`(max-width: ${BREAKPOINTS.PHONE_RANGE_END}px)`)
      .matches
  }
  const renderModal = (
    <div>
      <Modal
        isOpen={isMobile() ? modalVisible : false}
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
    </div>
  )
  const modifiers: Modifiers = {
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
  const popperProps: Partial<PopperProps> = {
    placement,
    modifiers,
    eventsEnabled: true,
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
Tooltip.SVGS = SVGS
Tooltip.PLACEMENT_TYPES = PLACEMENT_TYPES
Tooltip.BOUNDARIES_ELEMENT = BOUNDARIES_ELEMENT
Tooltip.defaultProps = {
  placement: PLACEMENT_TYPES.TOP,
  inline: false,
  boundariesElement: BOUNDARIES_ELEMENT.SCROLL_PARENT,
}
export default Tooltip
