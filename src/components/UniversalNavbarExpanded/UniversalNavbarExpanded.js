import React from 'react'
import PropTypes from 'prop-types'

// Reused assets from UniversalNavbar
import LogoNotAnimated from '../UniversalNavbar/assets/ethos-logo-black.js'
import { AccountIcon, SearchIcon } from '../UniversalNavbar/assets/icons.js'

// EDS core components
import { Layout } from '../index'

// UniversalNavbarExpanded simple siblings
import CtaButton from './CtaButton'
import NavLink from './NavLink'

// UniversalNavbarExpanded complex siblings
import DropdownNav from './DropdownNav/DropdownNav'
import MobileNav from './MobileNav/MobileNav'

// Styles
import styles from './UniversalNavbarExpanded.module.scss'

// TODO:  Update test descriptions / more tests
// TODO:  JS Docs
// TODO:  more code commenting in general
// TODO:  PropTypes review

/**
 * Fork of UniversalNavbar for testing on CMS, likely to be consolidated
 * into one component before deploy to Mono.
 *
 * Top level website navigation, fixed to the top of the viewport while scrolling.
 * Consumers can provide a custom link and content structure.
 *
 * TODO for more reusability, make the Account/Search links agnostic and optional
 *
 * @param {boolean} hideMobileCta - Hide cta on mobile
 * @param {boolean} hideDesktopCta - Hide cta on desktop
 * @param {function} trackCtaClick - Analytics function run when CTA Button is clicked
 * @param {object} LinkComponent - Agnotistic Reach and React Router Link (ex. Gatsby's <Link>)
 * @param {string} logoHref - Href for the logo
 * @param {object} links - URLs and text
 *
 * @return {JSX.Element}
 */
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
          <MobileNav
            extraClass={'isFixedCta'}
            logoHref={logoHref}
            links={links}
            linkListLinks={BELOW_ACCORDION_LINKS}
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
                <DropdownNav links={links} LinkComponent={LinkComponent} />
              </div>
              <div className={layoutClasses.join(' ')}>
                <SearchIconLink />
                <AccountIconLink />
                <div className={styles.cta}>
                  {!hideDesktopCta && (
                    <CtaButton
                      href={links.CTA.href}
                      trackingFunction={trackCtaClick}
                    />
                  )}
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
  /** Analytics function run when CTA Button is clicked */
  trackCtaClick: PropTypes.func,
  /** agnotistic Reach and React Router Link */
  LinkComponent: PropTypes.object,
  /** Href for the logo */
  logoHref: PropTypes.string.isRequired,
  /** URLs, text and unique IDs for links/titles/subcopy/keys
   *  Shaping at the highest level to ensure child components
   *  retain required properties as the links object is inherited
   */
  links: PropTypes.shape({
    INDEX: PropTypes.shape({
      href: PropTypes.string,
    }),
    CTA: PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
    }),
    ACCOUNT: PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
    }),
    SEARCH: PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
    }),
    NAVLINKS: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string,
        subnav: PropTypes.shape({
          cta: PropTypes.shape({
            href: PropTypes.string,
            id: PropTypes.string,
            subcopy: PropTypes.string,
            title: PropTypes.string,
          }),
          items: PropTypes.arrayOf(
            PropTypes.shape({
              href: PropTypes.string,
              id: PropTypes.string,
              title: PropTypes.string,
            })
          ),
        }),
      })
    ),
  }).isRequired,
}

UniversalNavbarExpanded.defaultProps = {
  hideMobileCta: false,
  hideDesktopCta: false,
  logoHref: '/',
  trackCtaClick: () => {},
  links: {},
}

export { UniversalNavbarExpanded }
