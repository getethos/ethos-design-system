import * as React from 'react'
import { useEffect, useRef } from 'react'
import useHideAriaSiblings from '../../hooks/a11y/useHideAriaSiblings'
import { getFocusableElements } from '../../hooks/a11y/useTrapFocus'
import { Portal } from '../Portal'
type SnackbarProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  isOpen?: boolean
}
/**
 * This is a base snackbar component meant to be unstyled and flexible so
 * that it is customizable and skinnable by consumers. Currently, only the
 * Nora application uses this component. If you plan to use in another Ethos
 * application, **please consult design first**!
 */
export const Snackbar: React.SFC<SnackbarProps> = ({
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
