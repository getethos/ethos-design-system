import React from 'react'
import PropTypes from 'prop-types'
import styles from './KabobMenu.module.scss'

const KabobIcon = () => {
  return (
    <svg
      width="4"
      height="12"
      viewBox="0 0 4 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.75 4.6875C2.47461 4.6875 3.0625 5.27539 3.0625 6C3.0625 6.72461 2.47461 7.3125 1.75 7.3125C1.02539 7.3125 0.4375 6.72461 0.4375 6C0.4375 5.27539 1.02539 4.6875 1.75 4.6875ZM0.4375 1.84375C0.4375 2.56836 1.02539 3.15625 1.75 3.15625C2.47461 3.15625 3.0625 2.56836 3.0625 1.84375C3.0625 1.11914 2.47461 0.53125 1.75 0.53125C1.02539 0.53125 0.4375 1.11914 0.4375 1.84375ZM0.4375 10.1562C0.4375 10.8809 1.02539 11.4688 1.75 11.4688C2.47461 11.4688 3.0625 10.8809 3.0625 10.1562C3.0625 9.43164 2.47461 8.84375 1.75 8.84375C1.02539 8.84375 0.4375 9.43164 0.4375 10.1562Z"
        fill="#7C8699"
      />
    </svg>
  )
}

export const KabobMenu = ({ onClick, onFocus, children }) => {
  return (
    <div className={styles.Container}>
      <button className={styles.Box} onClick={onClick} onFocus={onFocus}>
        <KabobIcon />
      </button>
      {children}
    </div>
  )
}

KabobMenu.propTypes = {
  /** `onFocus` - required callback for when the kabob is focused */
  onFocus: PropTypes.func.isRequired,
  /** `onClick` - required callback for when the kabob is clicked */
  onClick: PropTypes.func.isRequired,
  /** `children` - required node to display as a popover */
  children: PropTypes.node.isRequired,
}
