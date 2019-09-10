import React from 'react'

// onClick is an event handler, showMobileMenu is a boolean
const TransformingBurgerButton = ({ clickHandler, showMobileMenu }) => {
  return (
    <span className={showMobileMenu ? styles.showMobileMenu : ''}>
      <div onClick={clickHandler} className={styles.iconWrapper}>
        <div className={styles.icon}>
          <i />
        </div>
      </div>
    </span>
  )
}

export default TransformingBurgerButton
