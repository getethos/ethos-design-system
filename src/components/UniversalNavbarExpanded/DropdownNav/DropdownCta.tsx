import React from 'react'
// EDS core components
import { Body, COLORS, Spacer, TitleSmall } from '../../index'
// Reused assets from UniversalNavbar
import { DropdownLinkIcon } from '../../UniversalNavbar/assets/icons'
// Helpers
import IconIntegratedTitle from './IconIntegratedTitle'
type DropdownCtaProps = {
  title: string
  subcopy: string
}
const DropdownCta: React.SFC<DropdownCtaProps> = ({ title, subcopy }) => (
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
export default DropdownCta
