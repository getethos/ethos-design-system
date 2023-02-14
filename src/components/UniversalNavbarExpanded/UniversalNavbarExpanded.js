import React from 'react'
import PropTypes from 'prop-types'

// Reused assets from UniversalNavbar
import LogoNotAnimated from '../UniversalNavbar/assets/ethos-logo-black.js'
import { AccountIcon, SearchIcon } from '../UniversalNavbar/assets/icons.js'

// EDS core components
import { Layout, Caption2 } from '../index'

// UniversalNavbarExpanded simple siblings
import CtaButton from './CtaButton'
import NavLink from './NavLink'

// UniversalNavbarExpanded complex siblings
import DropdownNav from './DropdownNav/DropdownNav'
import MobileNav from './MobileNav/MobileNav'

// Styles
import styles from './UniversalNavbarExpanded.module.scss'

/**
 * Top level website navigation, fixed to the top of the viewport while scrolling.
 * Consumers can provide a custom link and content structure.
 *
 * @param {string} ctaButtonStyle - 'Black' | 'BlackOutline'
 * @param {boolean} hideMobileCta - Hide cta on mobile
 * @param {boolean} hideDesktopCta - Hide cta on desktop
 * @param {boolean} hideSearchIcon - Hide search icon on desktop and link on mobile
 * @param {boolean} hideAccountIcon - Hide account icon on desktop and link on mobile
 * @param {boolean} showSecondaryCta - Show secondary CTA text link on desktop and mobile
 * @param {function} trackCtaClick - Analytics function run when CTA Button is clicked
 * @param {function} trackSecondaryCtaClick - Analytics function run when secondary CTA text link is clicked
 * @param {function} trackItemClick - Analytics function run when a navbar or menu item is clicked
 * @param {object} LinkComponent - Agnotistic Reach and React Router Link (ex. Gatsby's <Link>)
 * @param {string} logoHref - Href for the logo
 * @param {object} links - URLs and text
 * @param {boolean} estimateExperiment - enable the estimate experiment button/copy
 * @param {object} singleCta = { href: string, title: string } - A single CTA Title/URL to link to in a reduced version of the navbar
 *
 * @return {JSX.Element}
 */
const UniversalNavbarExpanded = ({
  ctaButtonStyle,
  LinkComponent,
  hideMobileCta,
  hideDesktopCta,
  hideSearchIcon,
  hideAccountIcon,
  showSecondaryCta,
  logoHref,
  trackCtaClick,
  trackSecondaryCtaClick,
  trackItemClick,
  links,
  estimateExperiment,
  singleCta = {},
  navbarColor,
}) => {
  let BELOW_ACCORDION_LINKS = [links.CTA]

  if (showSecondaryCta) {
    BELOW_ACCORDION_LINKS.push(links.SECONDARY_CTA)
  }

  if (!hideAccountIcon) {
    BELOW_ACCORDION_LINKS.push(links.ACCOUNT)
  }
  if (!hideSearchIcon) {
    BELOW_ACCORDION_LINKS.push(links.SEARCH)
  }

  const SearchIconLink = () => (
    <NavLink
      className={styles.searchIcon}
      href={links.SEARCH.href}
      trackingFunction={trackItemClick}
      itemLabel={'SearchIcon'}
    >
      <SearchIcon />
    </NavLink>
  )

  const AccountIconLink = () => (
    <NavLink
      className={styles.accountIcon}
      href={links.ACCOUNT.href}
      trackingFunction={trackItemClick}
      itemLabel={'AccountIcon'}
    >
      <AccountIcon />
    </NavLink>
  )

  const ExperimentCopy = () => (
    <div
      className={styles.estimateCopyOptimizely}
      data-optimizely="estimateNavBarCopyOptimizely"
    >
      <div className={styles.estimateCopy}>
        <Caption2.Regular400>Want to know your real rate?</Caption2.Regular400>
      </div>
    </div>
  )

  const layoutClasses = [styles.flex, styles.itemsCenter]
  // navbarColor = 'moss'
  const CapitalizedBackgroundColor = navbarColor
    ? navbarColor.charAt(0).toUpperCase() + navbarColor.slice(1)
    : ''
  console.log(navbarColor + ' ' + CapitalizedBackgroundColor)
  const laptopAndUpClasses = [
    styles.laptopAndUp,
    styles[`bg${CapitalizedBackgroundColor}`],
  ]
  console.log(`laptopAndUp ${laptopAndUpClasses}`)
  console.log(`UniversalNavBarExpanded ${JSON.stringify(singleCta)}`)
  console.log(`hideDesktopCta ${hideDesktopCta}`)
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <Layout.ScrollDetector>
          <MobileNav
            ctaButtonStyle={ctaButtonStyle}
            extraClass={'isFixedCta'}
            logoHref={logoHref}
            links={links}
            secondaryLinksLinks={BELOW_ACCORDION_LINKS}
            hideMobileCta={hideMobileCta}
            ctaButtonTrackingFunction={trackCtaClick}
            itemTrackingFunction={trackItemClick}
            LinkComponent={LinkComponent}
            singleCta={singleCta}
          />
          <div className={laptopAndUpClasses.join(' ')}>
            <div className={styles.laptopAndUpContainer}>
              <div className={layoutClasses.join(' ')}>
                <NavLink
                  href={singleCta.href ? singleCta.href : logoHref}
                  LinkComponent={LinkComponent}
                  trackingFunction={trackItemClick}
                  itemLabel={'Logo'}
                >
                  {LogoNotAnimated({ className: styles.logo })}
                </NavLink>
                {!singleCta.href && (
                  <DropdownNav
                    links={links}
                    LinkComponent={LinkComponent}
                    trackingFunction={trackItemClick}
                  />
                )}
              </div>
              <div className={layoutClasses.join(' ')}>
                {!singleCta.href && (
                  <>
                    {estimateExperiment && <ExperimentCopy />}
                    {!hideSearchIcon && <SearchIconLink />}
                    {!hideAccountIcon && <AccountIconLink />}
                    {showSecondaryCta && (
                      <a
                        href={links.SECONDARY_CTA.href}
                        onClick={trackSecondaryCtaClick}
                      >
                        {links.SECONDARY_CTA.title}
                      </a>
                    )}
                  </>
                )}
                <div className={styles.cta}>
                  {!hideDesktopCta && (
                    <CtaButton
                      buttonStyle={ctaButtonStyle}
                      href={singleCta.href ? singleCta.href : links.CTA.href}
                      trackingFunction={trackCtaClick}
                      title={
                        singleCta.title ? singleCta.title : links.CTA.title
                      }
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
  ctaButtonStyle: PropTypes.oneOf(['Black', 'BlackOutline']),
  /** Hide cta on mobile */
  hideMobileCta: PropTypes.bool,
  /** Hide cta on desktop */
  hideDesktopCta: PropTypes.bool,
  /** Hide search icon on desktop and link on mobile */
  hideSearchIcon: PropTypes.bool,
  /** Hide account icon on desktop and link on mobile */
  hideAccountIcon: PropTypes.bool,
  /** Show secondary CTA text link */
  showSecondaryCta: PropTypes.bool,
  /** Analytics function run when CTA Button is clicked */
  trackCtaClick: PropTypes.func,
  /** Analytics function run when secondary CTA text link is clicked */
  trackSecondaryCtaClick: PropTypes.func,
  /** Analytics function run when a navbar or menu item is clicked */
  trackItemClick: PropTypes.func,
  /** Agnotistic Reach and React Router Link (ex. Gatsby's <Link>) */
  LinkComponent: PropTypes.object,
  /** Href for the logo */
  logoHref: PropTypes.string.isRequired,
  /** URLs and text */
  links: PropTypes.shape({
    /** Root application link { href: string } */
    INDEX: PropTypes.shape({
      href: PropTypes.string,
    }),
    /** CTA button link & text { href: string, title: string } */
    CTA: PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
    }),
    /** CTA text link { href: string, title: string } */
    SECONDARY_CTA: PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
    }),
    /** Account link & text { href: string, title: string } */
    ACCOUNT: PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
    }),
    /** Search link & text { href: string, title: string } */
    SEARCH: PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
    }),
    /** Navigation URLs, ids & copy. Use the following shape for each array element:
     * {
     *   title: string,
     *   id: string,
     *   subnav: {
     *     cta: { href: string, title: string, id: string, subcopy: string },
     *     items: array[{ href: string, title: string, id: string }]
     *   }
     * }
     */
    NAVLINKS: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.string,
        subnav: PropTypes.shape({
          cta: PropTypes.shape({
            href: PropTypes.string,
            title: PropTypes.string,
            id: PropTypes.string,
            subcopy: PropTypes.string,
            alternateIcon: PropTypes.oneOfType([
              PropTypes.element,
              PropTypes.func,
              PropTypes.bool,
            ]),
          }),
          items: PropTypes.arrayOf(
            PropTypes.shape({
              href: PropTypes.string,
              title: PropTypes.string,
              id: PropTypes.string,
            })
          ),
        }),
      })
    ),
  }).isRequired,
  /** Estimate copy experiment on optimizely */
  estimateExperiment: PropTypes.bool,
  singleCta: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
  }),
  navBarColor: PropTypes.string,
}

UniversalNavbarExpanded.defaultProps = {
  ctaButtonStyle: 'Black',
  hideMobileCta: false,
  hideDesktopCta: false,
  hideSearchIcon: false,
  hideAccountIcon: false,
  logoHref: '/',
  trackCtaClick: () => {},
  links: {},
  estimateExperiment: false,
  singleCta: {},
}

export { UniversalNavbarExpanded }
