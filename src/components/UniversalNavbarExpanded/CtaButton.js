import React from 'react'
import PropTypes from 'prop-types'

// EDS core components
import { Button } from '../index'

// Styles
import styles from './CtaButton.module.scss'

/**
 * Simple CTA button for use in UniversalNavBarExpanded.
 *
 * TODO Add onKeyPress for tracking function
 *
 * @param {string} href - URL for the button to link to
 * @param {function} trackingFunction - Analytics function run when CTA Button is clicked
 * @param {boolean} hideOnMobile - Hide the CTA on phone only
 * @param {string} title - Title text for the button
 *
 * @return {JSX.Element}
 */
const CtaButton = ({ href, trackingFunction, hideOnMobile, title }) => {
  // We still rely on some legacy UniversalNavbar styles from FancyAnimatedLogo.scss
  // TODO convert these to module.scss capable styles
  const CtaButtonClasses = [
    'cta-button',
    'navbar-expanded',
    'show-when-scrolled',
  ]

  if (hideOnMobile) {
    CtaButtonClasses.push(styles.hidden)
  }

  return (
    <a
      className={CtaButtonClasses.join(' ')}
      onClick={trackingFunction}
      href={href}
    >
      <Button.Small.Black>{title}</Button.Small.Black>
    </a>
  )
}

CtaButton.propTypes = {
  href: PropTypes.string.isRequired,
  trackingFunction: PropTypes.func.isRequired,
  hideOnMobile: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

export default CtaButton
