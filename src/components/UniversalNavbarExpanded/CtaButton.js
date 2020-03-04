import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../index'

const CtaButtonClasses = ['cta-button', 'navbar-expanded', 'show-when-scrolled']
const CtaButton = ({ href, trackingFunction }) => {
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

export default CtaButton
