import React from 'react'

type UniversalNavbarProps = {
  /** Hide cta on mobile viewport */
  hideMobileCta?: boolean
  /** Hide cta on desktop */
  hideDesktopCta?: boolean
  /** Run analytics function when CTA Button gets clicked */
  trackCtaClick?: () => void
  /** agnotistic Reach and React Router Link */
  LinkComponent?: any
  /** Href for the logo */
  logoHref?: string
  /** State if use is logged in */
  isLoggedIn: boolean
}

export declare const UniversalNavbar: React.FC<UniversalNavbarProps>
