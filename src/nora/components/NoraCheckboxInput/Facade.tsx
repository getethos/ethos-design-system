import * as React from 'react'
type FacadeProps = {
  classes: string
}
// Nora's Facade (checkbox shape) needs to be smaller to
// account for overall smaller font sizes we use in Nora
export const Facade: React.FC<FacadeProps> = ({ classes }) => {
  return (
    <svg
      className={classes}
      width="18"
      height="18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#fff"
        d="M 5.25 9.433594 L 2.816406 7 L 1.988281 7.820312 L 5.25 11.082031 L 12.25 4.082031 L 11.429688 3.261719 Z M 5.25 9.433594 "
      />
    </svg>
  )
}
