import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Portal } from '../Portal'
import styles from './Modal.module.scss'
import uuidv4 from 'uuid/v4'
import FocusTrap from 'focus-trap-react'
import useOutsideClick from '../../hooks/useOutsideClick'
import useSetFocus from '../../hooks/useSetFocus'
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
const ModalContent = ({ children, toggle }) => {
  const modalRef = useRef(null)
  const id = uuidv4()

  useOutsideClick(modalRef, () => toggle(false))
  //useSetFocus(modalRef, true)

  return (
    <div
      role="dialog"
      aria-modal="true"
      id={`modal-dialog-${id}`}
      className={styles.ModalContent}
      ref={modalRef}
    >
      {children}
    </div>
  )
}

ModalContent.propTypes = {
  children: PropTypes.node,
  toggle: PropTypes.func,
}

function useOverflowBody(setBodyOverflow) {
  useEffect(() => {
    const [body] = document.getElementsByTagName('body')

    if (setBodyOverflow) {
      body.setAttribute('style', 'overflow: hidden')
    }

    return () => {
      body.setAttribute('style', '')
    }
  }, [setBodyOverflow])
}

/**
 * Component renders a modal and its wrapper
 *
 * @param {object} props - the components props
 * @param {React.ReactChildren} props.children - the component's children
 * @param {boolean} props.showModal - flag sets the state of the modal
 * @param {(val: boolean) => void} props.toggle - handler that toggles the state of the modal
 *
 * @return {JSX.Element}
 */
export const Modal = ({ children, showModal, toggle }) => {
  const classes = showModal ? styles.ModalWrapperActive : styles.ModalWrapper

  useOverflowBody(showModal)

  const handleKeyDown = (e) => {
    if (['Escape', 'esc'].includes(e.key) || e.keyCode === 27) {
      toggle(false)
    }
  }

  return (
      <Portal id="modal-root">
        showModal && (<FocusTrap
          focusTrapOptions={{
            clickOutsideDeactivates: true,
          }}
        >
          <div
            className={classes}
            onKeyDown={handleKeyDown}
            aria-hidden={!showModal}
          >
            <ModalContent toggle={toggle}>{children}</ModalContent>
          </div>
        </FocusTrap>)
      </Portal>
  )
}

Modal.propTypes = {
  /** The Modal's children */
  children: PropTypes.node,
  /** Boolean that sets the state of the modal */
  showModal: PropTypes.bool,
  toggle: PropTypes.func,
}

Modal.Content = ModalContent
