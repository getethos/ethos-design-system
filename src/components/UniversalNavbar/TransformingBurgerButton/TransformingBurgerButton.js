import React from 'react'

// onClick is an event handler, showMobileMenu is a boolean
const TransformingBurgerButton = ({ clickHandler, showMobileMenu }) => {
  return (
    <span className="transforming-burger-button">
      <span className={showMobileMenu ? 'showMobileMenu' : ''}>
        <div onClick={clickHandler} className={'iconWrapper'}>
          <div className={'icon'}>
            <i />
          </div>
        </div>
      </span>
    </span>
  )
}

export default TransformingBurgerButton
