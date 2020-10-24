import * as React from 'react'
import { Portal } from '../Portal'
import styles from './Modal.module.scss'
import { ModalContent } from './ModalContent'
type ModalProps = {
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  isOpen?: boolean
  onDismiss: (...args: any[]) => any
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
export const Modal: React.SFC<ModalProps> = ({
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
