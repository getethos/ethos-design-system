import React from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'

import FancyAnimatedLogo from './FancyAnimatedLogo'
import LogoNotAnimated from './assets/ethos-logo-black.js'
import LogoWhite from './assets/ethos-logo-white.js'
import { Button, Layout, Spacer, TitleXLarge } from '../index'
import TransformingBurgerButton from './TransformingBurgerButton/TransformingBurgerButton'

import styles from './UniversalNavbar.module.scss'

// TODO REDESIGN: Lots of sloppy inline styles here.

// UPDATE anchor tags to NavLink when /term and /login is an internal link in CMS
const NavLink = ({ href, children, LinkComponent, ...props }) => {
  if (LinkComponent) {
    return (
      <LinkComponent to={href} {...props}>
        {children}
      </LinkComponent>
    )
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}

NavLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func,
  ]),
  href: PropTypes.string.isRequired,
  LinkComponent: PropTypes.object,
}

const LINKS = {
  // These are used e.g. in the logo and CTA button:
  INDEX: { href: '/' },
  TERM: { href: '/term' },

  // These are used in the navigation links proper:
  NAVLINKS: [
    {
      id: uuidv4(),
      href: '/how-it-works/',
      title: 'How it works',
    },
    {
      id: uuidv4(),
      href: '/why-ethos/',
      title: 'Why Ethos',
    },
    {
      id: uuidv4(),
      href: '/blog/',
      title: 'Blog',
    },
    {
      id: uuidv4(),
      href: '/search/',
      title: 'Search',
    },
    {
      id: uuidv4(),
      href: '/login/',
      title: 'Account',
    },
  ],
}

class UniversalNavbar extends React.Component {
  state = {
    showMobileMenu: false,
  }

  toggleHamburger = () => {
    // TODO: use functional setState
    this.setState({ showMobileMenu: !this.state.showMobileMenu })
  }

  handleHamburgerKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.toggleHamburger()
    }
  }

  render() {
    const {
      LinkComponent,
      hideMobileCta,
      hideDesktopCta,
      logoHref,
    } = this.props

    const renderCtaButton = (showWhenScrolled) => (
      <a
        className={
          'cta-button ' + (showWhenScrolled ? 'show-when-scrolled' : '')
        }
        onClick={this.props.trackCtaClick}
        href={LINKS.TERM.href}
      >
        <Button.Small.BlackOutline>Check my price</Button.Small.BlackOutline>
      </a>
    )

    const { showMobileMenu } = this.state
    const renderTextLink = (link) => (
      <div key={link.id} className={styles.textLink}>
        <NavLink
          href={link.href}
          LinkComponent={link.href !== '/login/' ? LinkComponent : null}
        >
          {link.title}
        </NavLink>
      </div>
    )

    // These are bespoke icons but design may replace w/FA at a later date
    const renderSearchIcon = (link) => {
      const searchIcon = (
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8.94497"
            cy="8.94399"
            r="7.86196"
            stroke="#272727"
            strokeWidth="1.5"
          />
          <path
            d="M14.3063 14.3041L21.6667 20.5876"
            stroke="#272727"
            strokeWidth="1.5"
          />
        </svg>
      )

      return (
        <NavLink
          className={styles.searchIcon}
          key={link.id}
          href={link.href}
          LinkComponent={link.href !== '/login/' ? LinkComponent : null}
        >
          {searchIcon}
        </NavLink>
      )
    }

    const renderAccountIcon = (link) => {
      const accountIcon = (
        <svg
          width="25"
          height="23"
          viewBox="0 0 25 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12.25"
            cy="5.25"
            r="4.5"
            stroke="#272727"
            strokeWidth="1.5"
          />
          <path
            d="M23.5639 22.25H0.751853C0.767099 19.9125 0.905198 17.7185 2.12836 16.0198C3.43803 14.201 6.17055 12.75 12.1579 12.75C18.1452 12.75 20.8778 14.201 22.1874 16.0198C23.4106 17.7185 23.5487 19.9125 23.5639 22.25Z"
            stroke="#272727"
            strokeWidth="1.5"
          />
        </svg>
      )

      return (
        <NavLink
          className={styles.accountIcon}
          key={link.id}
          href={link.href}
          LinkComponent={link.href !== '/login/' ? LinkComponent : null}
        >
          {accountIcon}
        </NavLink>
      )
    }

    return (
      <div className={styles.blockNavbar}>
        <div className={styles.navbar}>
          <Layout.ScrollDetector>
            <div className={styles.hamburger}>
              <TransformingBurgerButton
                showMobileMenu={showMobileMenu}
                clickHandler={this.toggleHamburger}
                keyPressHandler={this.handleHamburgerKeyPress}
              />
            </div>

            <div className={styles.phoneOnly}>
              {/* Dark green mobile menu, shows up when hamburger is clicked */}
              <div
                className={
                  showMobileMenu ? styles.mobileMenu : styles.hideMobileMenu
                }
              >
                <NavLink
                  href={logoHref}
                  LinkComponent={LinkComponent}
                  className={styles.phoneLogo}
                >
                  {LogoWhite({ className: styles.logo })}
                </NavLink>
                <Spacer.H56 />
                {LINKS.NAVLINKS.map((link) => (
                  <div key={link.id} style={{ marginBottom: 24 }}>
                    <TitleXLarge.Sans.Regular400>
                      <NavLink
                        href={link.href}
                        LinkComponent={
                          link.href !== '/login/' ? LinkComponent : null
                        }
                      >
                        {link.title}
                      </NavLink>
                    </TitleXLarge.Sans.Regular400>
                  </div>
                ))}
                <div style={{ position: 'absolute', bottom: 40 }}>
                  <a href={LINKS.TERM.href}>
                    <Button.Medium.WhiteOutline>
                      Check my price
                    </Button.Medium.WhiteOutline>
                  </a>
                </div>
              </div>

              {/* Mobile menu items, getAnEstimate only shows when scrolled */}
              <NavLink
                href={LINKS.INDEX.href}
                LinkComponent={LinkComponent}
                className={styles.phoneLogoFancy}
              >
                {FancyAnimatedLogo()}
              </NavLink>
              {!hideMobileCta && renderCtaButton(true)}
              {renderSearchIcon(LINKS.NAVLINKS[3])}
            </div>

            <div className={styles.tabletAndUp}>
              <div className={styles.tabletAndUpContainer}>
                {/* Desktop menu items to the left */}
                <div className={`${styles.flex} ${styles.itemsCenter}`}>
                  <NavLink href={logoHref} LinkComponent={LinkComponent}>
                    {LogoNotAnimated({ className: styles.logo })}
                  </NavLink>
                  {renderTextLink(LINKS.NAVLINKS[0])}
                  {renderTextLink(LINKS.NAVLINKS[1])}
                  <div className={styles.laptopAndUp}>
                    {renderTextLink(LINKS.NAVLINKS[2])}
                  </div>
                </div>

                {/* Desktop menu items to the right */}
                <div className={`${styles.flex} ${styles.itemsCenter}`}>
                  {renderSearchIcon(LINKS.NAVLINKS[3])}
                  {renderAccountIcon(LINKS.NAVLINKS[4])}
                  <div className={styles.cta}>
                    {!hideDesktopCta && renderCtaButton(false)}
                  </div>
                </div>
              </div>
            </div>
          </Layout.ScrollDetector>
        </div>
      </div>
    )
  }
}

UniversalNavbar.propTypes = {
  /** Hide cta on mobile viewport */
  hideMobileCta: PropTypes.bool,
  /** Hide cta on desktop */
  hideDesktopCta: PropTypes.bool,
  /** Run analytics function when CTA Button gets clicked */
  trackCtaClick: PropTypes.func,
  /** agnotistic Reach and React Router Link */
  LinkComponent: PropTypes.object,
  /** Href for the logo */
  logoHref: PropTypes.string,
}

UniversalNavbar.defaultProps = {
  hideMobileCta: false,
  hideDesktopCta: false,
  logoHref: LINKS.INDEX.href,
  trackCtaClick: () => {},
}

export { UniversalNavbar }
