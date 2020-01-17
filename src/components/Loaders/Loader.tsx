import React from 'react'

// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role

Loader.COPY = 'Loading…'

export function Loader() {
  return (
    <span
      role="progressbar"
      aria-busy="true"
      aria-live="polite"
      aria-valuetext={Loader.COPY}
    >
      {Loader.COPY}
    </span>
  )
}
