import React from 'react'
import PropTypes from 'prop-types'

// Reused assets from UniversalNavbar
import { DropdownLinkIcon } from '../../UniversalNavbar/assets/icons.js'

// EDS core components
import { Spacer, Body, COLORS, TitleSmall } from '../../index'

// Helpers
import IconIntegratedTitle from './IconIntegratedTitle'

/**
 * CTA copy for use in DropdownNav
 *
 *
 * @param {string} title - A short title
 * @param {string} subcopy - A sentence of supporting copy
 *
 * @return {JSX.Element}
 */
const DropdownCta = ({ title, subcopy }) => (
  <>
    <TitleSmall.Serif.Book500>
      <IconIntegratedTitle title={title}>
        <DropdownLinkIcon />
      </IconIntegratedTitle>
    </TitleSmall.Serif.Book500>
    <Spacer.H8 />
    <Body.Regular400 color={COLORS.GRAY_SECONDARY}>{subcopy}</Body.Regular400>
  </>
)

DropdownCta.propTypes = {
  title: PropTypes.string.isRequired,
  subcopy: PropTypes.string.isRequired,
}

export default DropdownCta
