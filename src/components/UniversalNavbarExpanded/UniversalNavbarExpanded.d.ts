import React from 'react'

type SubNavItem = {
  href: string
  title: string
  id: string
}

type NavLink = {
  title: string
  id: string
  subnav: {
    cta: {
      href: string
      title: string
      id: string
      subcopy: string
      alternateIcon?: any
    }
    items: SubNavItem[]
  }
}

type UniversalNavbarExpandedProps = {
  /** Hide cta on mobile viewport */
  hideMobileCta?: boolean
  /** Hide cta on desktop */
  hideDesktopCta?: boolean
  /** Run analytics function when CTA Button gets clicked */
  trackCtaClick?: () => void
  /** agnotistic Reach and React Router Link */
  LinkComponent?: any
  /** Href for the logo */
  logoHref: string

  links: {
    INDEX: {
      href: string
    }
    CTA: {
      href: string
      onClick: () => void
      title: string
    }
    ACCOUNT: {
      href: string
      title: string
    }
    SEARCH: {
      href: string
      title: string
    }
    NAVLINKS: NavLink[]
  }

  /** Estimate copy experiment on optimizely */
  estimateExperiment?: boolean

  singleCta?: { href: string; title: string }

  ctaButtonStyle?: 'BlackOutline' | 'Black'
}

export declare const UniversalNavbarExpanded: React.FC<UniversalNavbarExpandedProps>
