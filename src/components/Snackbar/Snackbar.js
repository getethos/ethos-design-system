import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Portal } from '../Portal'
import useHideAriaSiblings from '../../hooks/a11y/useHideAriaSiblings'
import { getFocusableElements } from '../../hooks/a11y/useTrapFocus'

// TODO: ----- Snackbar TODOS -----
// TODO: Add timeout functionality. Defaults or props.
// TODO: Add animation when showing / dismissing the Snacks
// TODO: Specs

/**
 * This is a base snackbar component meant to be unstyled and flexible so
 * that it is customizable and skinnable by consumers. Currently, only the
 * Nora application uses this component. If you plan to use in another Ethos
 * application, **please consult design first**!
 */
export const Snackbar = ({
  id,
  isOpen = false,
  ariaLabelledBy,
  ariaDescribedBy,
  children,
  className,
}) => {
  const snackbarRef = useRef(null)
  useHideAriaSiblings(snackbarRef, isOpen)

  useEffect(() => {
    // Focus on first focusable element in the snackbar
    const focusableElements = getFocusableElements(snackbarRef.current)
    if (focusableElements.length) {
      focusableElements[0].focus()
    }
  }, [snackbarRef, children])

  return (
    <Portal id={id}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        role="dialog"
        aria-modal="true"
        aria-describedby={ariaDescribedBy && ariaDescribedBy}
        aria-labelledby={ariaLabelledBy && ariaLabelledBy}
        aria-hidden={!isOpen}
        data-testid="snackbar-container"
        className={className}
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
  /** classes for the Snackbar container. Likely fixed to some position. */
  className: PropTypes.string.isRequired,
}
