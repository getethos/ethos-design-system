import * as React from 'react'
import styles from './Button.module.scss'
export const ArrowIconInline = ({ shouldFlip }: { shouldFlip?: boolean }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={
        shouldFlip ? styles.backArrowIconInline : styles.arrowIconInline
      }
    >
      <path d="M7.00016 0.333374L5.82516 1.50837L10.4752 6.16671H0.333496V7.83337H10.4752L5.82516 12.4917L7.00016 13.6667L13.6668 7.00004L7.00016 0.333374Z" />
    </svg>
  )
}
