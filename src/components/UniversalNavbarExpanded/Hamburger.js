import React from 'react'
import TransformingBurgerButton from '../UniversalNavbar/TransformingBurgerButton/TransformingBurgerButton'
import PropTypes from 'prop-types'

const Hamburger = ({ className, menuState, clickHandler, keyPressHandler }) => (
  <div className={className}>
    <TransformingBurgerButton
      showMobileMenu={menuState}
      clickHandler={clickHandler}
      keyPressHandler={keyPressHandler}
    />
  </div>
)

Hamburger.propTypes = {
  /** Hide cta on mobile viewport */
  className: PropTypes.string.isRequired,
  menuState: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
  keyPressHandler: PropTypes.func.isRequired,
}

export default Hamburger
