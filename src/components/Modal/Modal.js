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
 * @param {(val: boolean) => any} props.toggle - callback function that toggles the
 * show modal state
 *
 * @return {JSX.Element}
 */
const ModalContent = ({
  ariaDescribedBy,
  ariaLabelledBy,
  children,
  toggle,
  showModal,
}) => {
  const modalRef = useRef(null)

  // Hooks! All the thingggs!!!!!
  useOutsideClick(modalRef, () => toggle(false))
  useTrapFocus(modalRef, showModal)
  useBodyScrollLock(showModal)
  useHideAriaSiblings(modalRef, showModal)

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
  toggle: PropTypes.func,
  showModal: PropTypes.bool,
}

/**
 * Component renders a modal and it's wrapper
 *
 * @param {object} props - the components props
 * @param {React.ReactChildren} props.children - the component's children
 * @param {boolean} props.showModal - flag sets the state of the modal
 * @param {(val: boolean) => void} props.toggle - handler that toggles the state of the modal
 *
 * @return {JSX.Element}
 */
export const Modal = ({
  children,
  toggle,
  ariaLabelledBy,
  ariaDescribedBy,
  showModal = false,
}) => {
  const classes = showModal ? styles.ModalWrapperActive : styles.ModalWrapper

  /**
   * Handler will set the the modal toggle to `false` when the escape key is
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
      toggle(false)
    }
  }

  return (
    <Portal id="modal-root">
      <div
        className={classes}
        onKeyDown={handleKeyDown}
        aria-hidden={!showModal}
        data-testid="base-modal-container"
      >
        {showModal && (
          <ModalContent
            toggle={toggle}
            ariaDescribedBy={ariaDescribedBy}
            ariaLabelledBy={ariaLabelledBy}
            showModal={showModal}
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
  showModal: PropTypes.bool,
  /** handler that toggles the state of the modal */
  toggle: PropTypes.func.isRequired,
}
