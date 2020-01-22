import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Portal } from '../Portal'
import styles from './Modal.module.scss'
import useOutsideClick from '../../hooks/a11y/useOutsideClick'
import useBodyScrollLock from '../../hooks/a11y/useBodyScrollLock'
import useTrapFocus from '../../hooks/a11y/useTrapFocus'
import useHideAriaSiblings from '../../hooks/a11y/useHideAriaSiblings'

/**
 * Component renders the internal content of a modal
 *
 * @param {object} props - the component's props
 * @param {React.ReactChildren} props.children - the component's children
 * @param {(val: boolean) => any} props.onDismiss - callback function that onDismisss the
 * show modal state
 *
 * @return {JSX.Element}
 */
const ModalContent = ({
  ariaDescribedBy,
  ariaLabelledBy,
  children,
  onDismiss,
  isOpen,
}) => {
  const modalRef = useRef(null)

  // Hooks! All the thingggs!!!!!
  useOutsideClick(modalRef, () => onDismiss(false))
  useTrapFocus(modalRef, isOpen)
  useBodyScrollLock(isOpen)
  useHideAriaSiblings(modalRef, isOpen)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-describedby={ariaDescribedBy && ariaDescribedBy}
      aria-labelledby={ariaLabelledBy && ariaLabelledBy}
      className={styles.ModalContent}
      ref={modalRef}
    >
      {children}
    </div>
  )
}

ModalContent.propTypes = {
  ariaDescribedBy: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  children: PropTypes.node,
  onDismiss: PropTypes.func,
  isOpen: PropTypes.bool,
}

/**
 * Component renders a modal and it's wrapper
 *
 * @param {object} props - the components props
 * @param {React.ReactChildren} props.children - the component's children
 * @param {boolean} props.isOpen - flag sets the state of the modal
 * @param {(val: boolean) => void} props.onDismiss - handler that onDismisss the state of the modal
 *
 * @return {JSX.Element}
 */
export const Modal = ({
  children,
  onDismiss,
  ariaLabelledBy,
  ariaDescribedBy,
  isOpen = false,
}) => {
  const classes = isOpen ? styles.ModalWrapperActive : styles.ModalWrapper

  /**
   * Handler will set the the modal onDismiss to `false` when the escape key is
   * pressed
   *
   * @private
   *
   * @param {KeyboardEvent} e - the keyboard event
   *
   * @return {void}
   */
  const handleKeyDown = (e) => {
    if (['Escape', 'esc'].includes(e.key) || e.keyCode === 27) {
      onDismiss(false)
    }
  }

  return (
    <Portal id="modal-root">
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={classes}
        onKeyDown={handleKeyDown}
        aria-hidden={!isOpen}
        data-testid="base-modal-container"
      >
        {isOpen && (
          <ModalContent
            onDismiss={onDismiss}
            ariaDescribedBy={ariaDescribedBy}
            ariaLabelledBy={ariaLabelledBy}
            isOpen={isOpen}
          >
            {children}
          </ModalContent>
        )}
      </div>
    </Portal>
  )
}

Modal.propTypes = {
  /** Id of an element that labels the modal */
  ariaLabelledBy: PropTypes.string,
  /** Id of an element that describes the modal */
  ariaDescribedBy: PropTypes.string,
  /** The Modal's children */
  children: PropTypes.node.isRequired,
  /** Boolean that sets the state of the modal */
  isOpen: PropTypes.bool,
  /** handler that onDismisss the state of the modal */
  onDismiss: PropTypes.func.isRequired,
}
