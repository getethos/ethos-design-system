import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Portal } from '../Portal'
import useOutsideClick from '../../hooks/a11y/useOutsideClick'
import useOutsideEscape from '../../hooks/a11y/useOutsideEscape'
import useHideAriaSiblings from '../../hooks/a11y/useHideAriaSiblings'
import useTrapFocus from '../../hooks/a11y/useTrapFocus'

/**
 * This is a base snackbar component meant to be unstyled and flexible so
 * that it is customizable and skinnable by consumers. Currently, only the
 * Nora application uses this component. If you plan to use in another Ethos
 * application, **please consult design first**!
 */
export const Snackbar = ({
  id,
  onDismiss,
  isOpen = false,
  ariaLabelledBy,
  ariaDescribedBy,
  children,
}) => {
  const snackbarRef = useRef(null)
  useOutsideClick(snackbarRef, () => onDismiss(false))
  useOutsideEscape(snackbarRef, () => onDismiss(false))
  useTrapFocus(snackbarRef, isOpen)
  useHideAriaSiblings(snackbarRef, isOpen)

  const handleKeyDown = (e) => {
    if (['Escape', 'esc'].includes(e.key) || e.keyCode === 27) {
      onDismiss(false)
    }
  }

  return (
    <Portal id={id}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        role="dialog"
        aria-modal="true"
        onKeyDown={handleKeyDown}
        aria-describedby={ariaDescribedBy && ariaDescribedBy}
        aria-labelledby={ariaLabelledBy && ariaLabelledBy}
        aria-hidden={!isOpen}
        data-testid="snackbar-container"
        ref={snackbarRef}
      >
        {isOpen && children}
      </div>
    </Portal>
  )
}

Snackbar.propTypes = {
  /** Id of port element */
  id: PropTypes.string.isRequired,
  /** Id of an element that labels the modal */
  ariaLabelledBy: PropTypes.string,
  /** Id of an element that describes the modal */
  ariaDescribedBy: PropTypes.string,
  /** The Modal's children */
  children: PropTypes.node.isRequired,
  /** Boolean that sets the state of the modal */
  isOpen: PropTypes.bool,
  /** handler that onDismiss the state of the modal */
  onDismiss: PropTypes.func.isRequired,
}
