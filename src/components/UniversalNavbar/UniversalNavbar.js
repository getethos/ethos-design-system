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
const NavLink = ({ href, LinkComponent, ...props }) => {
  if (LinkComponent) {
    return <LinkComponent to={href} {...props} />
  }
  return <a href={href} {...props} />
}

NavLink.propTypes = {
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
      href: '/faq/',
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
    const renderSearchIcon = (link) => (
      <NavLink
        className={styles.searchIcon}
        key={link.id}
        href={link.href}
        LinkComponent={link.href !== '/login/' ? LinkComponent : null}
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8.0739"
            cy="8.0739"
            r="7.0739"
            stroke="#221F1F"
            strokeWidth="2"
          />
          <path
            d="M13.0997 13.1L20.0002 18.9909"
            stroke="#221F1F"
            strokeWidth="2"
          />
        </svg>
      </NavLink>
    )

    const renderAccountIcon = (link) => (
      <NavLink
        className={styles.accountIcon}
        key={link.id}
        href={link.href}
        LinkComponent={link.href !== '/login/' ? LinkComponent : null}
      >
        <svg
          width="22"
          height="21"
          viewBox="0 0 22 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="10.9261"
            cy="5.9261"
            r="4.9261"
            stroke="#221F1F"
            strokeWidth="2"
          />
          <circle
            cx="10.9261"
            cy="5.9261"
            r="4.9261"
            stroke="#221F1F"
            strokeWidth="2"
          />
          <path
            d="M20.8522 20.7781C20.8522 15.2961 16.4081 10.8521 10.9261 10.8521C5.44407 10.8521 1 15.2961 1 20.7781"
            stroke="#221F1F"
            strokeWidth="2"
          />
        </svg>
      </NavLink>
    )

    return (
      <div style={{ height: 64 }}>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: 64,
            zIndex: 1,
          }}
        >
          <Layout.ScrollDetector>
            <div className={styles.hamburger}>
              <TransformingBurgerButton
                showMobileMenu={showMobileMenu}
                clickHandler={this.toggleHamburger}
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
                <FancyAnimatedLogo />
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
