import React from 'react'
import PropTypes from 'prop-types'

import LogoNotAnimated from '../UniversalNavbar/assets/ethos-logo-black.js'
import { AccountIcon, SearchIcon } from '../UniversalNavbar/assets/icons.js'
import { Layout } from '../index'
import NavLink from './NavLink'
import DropDownNav from './Desktop/DropDownNav'
import MobileNavbar from './Mobile/MobileNavbar'
import CtaButton from './CtaButton'
import styles from './UniversalNavbarExpanded.module.scss'

// TODO:  Update test descriptions / more tests
// TODO:  JS Docs
// TODO:  more code commenting in general
// TODO:  PropTypes review

const UniversalNavbarExpanded = ({
  LinkComponent,
  hideMobileCta,
  hideDesktopCta,
  logoHref,
  trackCtaClick,
  links,
}) => {
  const BELOW_ACCORDION_LINKS = [links.CTA, links.ACCOUNT, links.SEARCH]

  const SearchIconLink = () => (
    <NavLink className={styles.searchIcon} href={links.SEARCH.href}>
      <SearchIcon />
    </NavLink>
  )

  const AccountIconLink = () => (
    <NavLink className={styles.accountIcon} href={links.ACCOUNT.href}>
      <AccountIcon />
    </NavLink>
  )

  const layoutClasses = [styles.flex, styles.itemsCenter]

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <Layout.ScrollDetector>
          <MobileNavbar
            extraClass={'isFixedCta'}
            logoHref={logoHref}
            links={links}
            belowAccordionLinks={BELOW_ACCORDION_LINKS}
            hideMobileCta={hideMobileCta}
            ctaButtonTrackingFunction={trackCtaClick}
            LinkComponent={LinkComponent}
          />
          <div className={styles.laptopAndUp}>
            <div className={styles.laptopAndUpContainer}>
              <div className={layoutClasses.join(' ')}>
                <NavLink href={logoHref} LinkComponent={LinkComponent}>
                  {LogoNotAnimated({ className: styles.logo })}
                </NavLink>
                <DropDownNav links={links} LinkComponent={LinkComponent} />
              </div>
              <div className={layoutClasses.join(' ')}>
                <SearchIconLink />
                <AccountIconLink />
                <div className={styles.cta}>
                  {!hideDesktopCta && <CtaButton />}
                </div>
              </div>
            </div>
          </div>
        </Layout.ScrollDetector>
      </div>
    </div>
  )
}

UniversalNavbarExpanded.propTypes = {
  /** Hide cta on mobile viewport */
  hideMobileCta: PropTypes.bool,
  /** Hide cta on desktop */
  hideDesktopCta: PropTypes.bool,
  /** Run analytics function when CTA Button gets clicked */
  trackCtaClick: PropTypes.func,
  /** agnotistic Reach and React Router Link */
  LinkComponent: PropTypes.object,
  /** Href for the logo */
  logoHref: PropTypes.string.isRequired,
  /** Object of URLs and text */
  // TODO add shape
  links: PropTypes.object.isRequired,
}

UniversalNavbarExpanded.defaultProps = {
  hideMobileCta: false,
  hideDesktopCta: false,
  logoHref: '/',
  trackCtaClick: () => {},
  links: {},
}

export { UniversalNavbarExpanded }
