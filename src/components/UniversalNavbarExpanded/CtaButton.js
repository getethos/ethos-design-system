import React from 'react'
import PropTypes from 'prop-types'

// EDS core components
import { Button } from '../index'

/**
 * Simple CTA button for use in UniversalNavBarExpanded.
 *
 * TODO Add onKeyPress for tracking function
 *
 * @param {string} href - URL for the button to link to
 * @param {function} trackingFunction - Analytics function run when CTA Button is clicked
 *
 * @return {JSX.Element}
 */
const CtaButton = ({ href, trackingFunction }) => {
  // We still rely on some legacy UniversalNavbar styles from FancyAnimatedLogo.scss
  // TODO convert these to module.scss capable styles
  const CtaButtonClasses = [
    'cta-button',
    'navbar-expanded',
    'show-when-scrolled',
  ]
  return (
    <a
      className={CtaButtonClasses.join(' ')}
      onClick={trackingFunction}
      href={href}
    >
      <Button.Small.Black>Check my price</Button.Small.Black>
    </a>
  )
}

CtaButton.propTypes = {
  href: PropTypes.string.isRequired,
  trackingFunction: PropTypes.func.isRequired,
}

export default CtaButton
