import React from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'

import FancyAnimatedLogo from './FancyAnimatedLogo'
import LogoNotAnimated from './assets/ethos-logo-black.js'
import LogoWhite from './assets/ethos-logo-white.js'
import { Button, Layout, Spacer, TitleXLarge } from '../index'
import TransformingBurgerButton from './TransformingBurgerButton/TransformingBurgerButton'

import styles from  './UniversalNavbar.module.scss'

// TODO REDESIGN: Lots of sloppy inline styles here.
// TODO: Remove last usages of the Media helper (and prefer the Sass MQ mixins).

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
    const { LinkComponent, hideMobileCta } = this.props

    const getAnEstimate = (showWhenScrolled) => (
      <a
        className={
          'get-an-estimate ' + (showWhenScrolled ? 'show-when-scrolled' : '')
        }
        onClick={this.props.trackCtaClick}
        href={LINKS.TERM.href}
      >
        <Button.Small.BlackOutline>Check my price</Button.Small.BlackOutline>
      </a>
    )

    const { showMobileMenu } = this.state

    const renderDesktopLink = (link) => (
      <div key={link.id} className={styles.paddingLeft}>
        <NavLink
          href={link.href}
          LinkComponent={link.href !== '/login/' ? LinkComponent : null}
        >
          {link.title}
        </NavLink>
      </div>
    )

    return (
      <div style={{ height: 64 }}>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: 100,
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
                <NavLink href={LINKS.INDEX.href} LinkComponent={LinkComponent}>
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
              <NavLink href={LINKS.INDEX.href} LinkComponent={LinkComponent}>
                <FancyAnimatedLogo />
              </NavLink>
              {!hideMobileCta && getAnEstimate(true)}
            </div>

            <div className={styles.tabletAndUp}>
              <div className={styles.tabletAndUpContainer}>
                {/* Desktop menu items to the left */}
                <div className={`${styles.flex} ${styles.itemsCenter}`}>
                  <NavLink
                    href={LINKS.INDEX.href}
                    LinkComponent={LinkComponent}
                  >
                    {LogoNotAnimated({ className: styles.logo })}
                  </NavLink>
                  {renderDesktopLink(LINKS.NAVLINKS[0])}
                  {renderDesktopLink(LINKS.NAVLINKS[1])}

                  <div className={styles.laptopAndUp}>
                    {renderDesktopLink(LINKS.NAVLINKS[2])}
                  </div>
                </div>

                {/* Desktop menu items to the right */}
                <div className={`${styles.flex} ${styles.itemsCenter}`}>
                  <div className={styles.laptopAndUp}>
                    {LINKS.NAVLINKS.slice(-1).map(renderDesktopLink)}
                  </div>

                  <div className={styles.paddingLeft}>
                    {getAnEstimate(false)}
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
  hideMobileCta: PropTypes.bool.isRequired,
  /** Run analytics function when CTA Button gets clicked */
  trackCtaClick: PropTypes.func.isRequired,
  /** agnotistic Reach and React Router Link */
  LinkComponent: PropTypes.object,
}

UniversalNavbar.defaultProps = {
  hideMobileCta: false,
  trackCtaClick: () => {},
}

export { UniversalNavbar }
