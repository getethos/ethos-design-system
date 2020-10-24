import * as React from 'react'
import { useRef } from 'react'
import useBodyScrollLock from '../../hooks/a11y/useBodyScrollLock'
import useHideAriaSiblings from '../../hooks/a11y/useHideAriaSiblings'
import useOutsideClick from '../../hooks/a11y/useOutsideClick'
import useTrapFocus from '../../hooks/a11y/useTrapFocus'
import styles from './Modal.module.scss'
type ModalContentProps = {
  ariaDescribedBy?: string
  ariaLabelledBy?: string
  onDismiss?: (...args: any[]) => any
  isOpen?: boolean
}
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
export const ModalContent: React.FC<ModalContentProps> = ({
  ariaDescribedBy,
  ariaLabelledBy,
  children,
  onDismiss = () => {},
  isOpen = false,
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
