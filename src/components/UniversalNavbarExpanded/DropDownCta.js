import React from 'react'
import PropTypes from 'prop-types'
import { Spacer, Body, COLORS, TitleSmall } from '../index'
import { DropdownLinkIcon } from '../UniversalNavbar/assets/icons.js'

const DropDownCta = ({ title, subcopy }) => (
  <>
    <TitleSmall.Serif.Book500>
      <span>{title}</span>
      <DropdownLinkIcon />
    </TitleSmall.Serif.Book500>
    <Spacer.H8 />
    <Body.Regular400 color={COLORS.GRAY_SECONDARY}>{subcopy}</Body.Regular400>
  </>
)

DropDownCta.propTypes = {
  title: PropTypes.string.isRequired,
  subcopy: PropTypes.string.isRequired,
}

export default DropDownCta
