import React from 'react'
import PropTypes from 'prop-types'
import styles from './TransformingBurgerButton.module.scss'

// onClick is an event handler, showMobileMenu is a boolean
const TransformingBurgerButton = ({
  clickHandler,
  keyPressHandler,
  showMobileMenu,
}) => {
  return (
    <span className={showMobileMenu ? styles.showMobileMenu : ''}>
      <div
        onClick={clickHandler}
        onKeyPress={keyPressHandler}
        className={styles.iconWrapper}
        role="button"
        tabIndex="0"
        aria-label="Menu"
      >
        <div className={styles.icon}>
          <i />
        </div>
      </div>
    </span>
  )
}

TransformingBurgerButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  keyPressHandler: PropTypes.func.isRequired,
  showMobileMenu: PropTypes.bool.isRequired,
}

export default TransformingBurgerButton
