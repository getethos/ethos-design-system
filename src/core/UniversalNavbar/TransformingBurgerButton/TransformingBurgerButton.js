import React from 'react'
import PropTypes from 'prop-types'
import styles from './TransformingBurgerButton.module.scss'

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

TransformingBurgerButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  showMobileMenu: PropTypes.bool.isRequired,
}

export default TransformingBurgerButton
