/* eslint-disable  */
import React from 'react'
import PropTypes from 'prop-types'

// More code from monorepo

function isTouchUI() {
  return 'ontouchstart' in window
}

function InfoIcon({ onMouseOver, onMouseOut, onTouch, onFocus, onBlur }) {
  return (
    <div
      style={{
        position: 'relative',
        top: '-2px',
        padding: isTouchUI() ? '2px 8px 8px 8px' : '0',
        marginLeft: isTouchUI() ? '0' : '5px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onTouchStart={onTouch}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={
        (e) => e.preventDefault() /* Do not trigger click event on parent */
      }
    >
      <div
        style={{
          top: '-2px',
          padding: '4px 0 0 0',
          background: 'rgba(0, 0, 0, 0.78)',
          color: 'white',
          borderRadius: '50%',
          fontSize: '14px',
          fontWeight: '800',
          width: '18px',
          height: '18px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',

          // Prevent touch users from selecting the "i" text when held
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          khtmlUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
        }}
      >
        i
      </div>
    </div>
  )
}

InfoIcon.defaultProps = {
  onMouseOver: () => {},
  onMouseOut: () => {},
  onTouchStart: () => {},
  onTouchEnd: () => {},
  onFocus: () => {},
  onBlur: () => {},
}

InfoIcon.propTypes = {
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default InfoIcon
