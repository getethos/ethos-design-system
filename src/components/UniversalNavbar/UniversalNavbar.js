import React from 'react'
import PropTypes from 'prop-types'

import FancyAnimatedLogo from './FancyAnimatedLogo'
import LogoNotAnimated from './assets/ethos-logo-black.js'
import LogoWhite from './assets/ethos-logo-white.js'
import { Media, Button, Layout, Spacer, TitleXLarge } from '../index'
import TransformingBurgerButton from './TransformingBurgerButton/TransformingBurgerButton'

// TODO REDESIGN: Lots of sloppy inline styles here.
// TODO: Remove last usages of the Media helper (and prefer the Sass MQ mixins).

const LINKS = {
  // These are used e.g. in the logo and CTA button:
  INDEX: { href: '/' },
  TERM: { href: '/term' },

  // These are used in the navigation links proper:
  NAVLINKS: [
    {
      href: '/how-it-works/',
      title: 'How it works',
    },
    {
      href: '/why-ethos/',
      title: 'Why Ethos',
    },
    {
      href: '/blog/',
      title: 'Blog',
    },
    {
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
    const NavLink = ({ href, ...props }) => {
      const PropsLink = this.props.link
      if (PropsLink) {
        return <PropsLink to={href} {...props} />
      }
      return <a href={href} {...props} />
    }

    const getAnEstimate = (showWhenScrolled) => (
      <a
        className={
          'get-an-estimate ' + (showWhenScrolled ? 'show-when-scrolled' : '')
        }
        onClick={this.props.trackCtaClick}
        href={LINKS.TERM.href}
      >
        <Button.Medium.BlackOutline>Check my price</Button.Medium.BlackOutline>
      </a>
    )

    const { showMobileMenu } = this.state

    const renderDesktopLink = (l) => (
      <div
        key={l.title + 'nonmobile'}
        className={'universal-navbar-paddingLeft'}
      >
        <NavLink href={l.href}>{l.title}</NavLink>
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
            <div className={'UniversalNavbar--hamburger'}>
              <TransformingBurgerButton
                showMobileMenu={showMobileMenu}
                clickHandler={this.toggleHamburger}
              />
            </div>

            <div className={'UniversalNavbar--phoneOnly'}>
              {/* Dark green mobile menu, shows up when hamburger is clicked */}
              <div
                className={
                  showMobileMenu ? 'shownMobileMenu' : 'hiddenMobileMenu'
                }
              >
                <NavLink href={LINKS.INDEX.href}>
                  {LogoWhite({ className: 'universal-navbar-logo' })}
                </NavLink>
                <Spacer.H56 />
                {LINKS.NAVLINKS.map((l) => (
                  <div key={l.title + 'mobile'} style={{ marginBottom: 24 }}>
                    <TitleXLarge.Sans.Regular400>
                      <NavLink key={l.title + 'mobile'} href={l.href}>
                        {l.title}
                      </NavLink>
                    </TitleXLarge.Sans.Regular400>
                  </div>
                ))}
                <div style={{ position: 'absolute', bottom: 40 }}>
                  <a href={LINKS.TERM.href}>
                    <Button.Medium.BlackOutline>
                      Check my price
                    </Button.Medium.BlackOutline>
                  </a>
                </div>
              </div>

              {/* Mobile menu items, getAnEstimate only shows when scrolled */}
              <NavLink href={LINKS.INDEX.href}>
                <FancyAnimatedLogo />
              </NavLink>
              {getAnEstimate(true)}
            </div>

            <div className={'UniversalNavbar--tabletAndUp'}>
              <div className={'UniversalNavbar__tabletAndUpContainer'}>
                {/* Desktop menu items to the left */}
                <div className="flex items-center">
                  <NavLink href={LINKS.INDEX.href}>
                    {LogoNotAnimated({ className: 'universal-navbar-logo' })}
                  </NavLink>
                  {renderDesktopLink(LINKS.NAVLINKS[0])}
                  {renderDesktopLink(LINKS.NAVLINKS[1])}
                  <Media.LaptopAndUp>
                    {renderDesktopLink(LINKS.NAVLINKS[2])}
                  </Media.LaptopAndUp>
                </div>

                {/* Desktop menu items to the right */}
                <div className="flex items-center">
                  <Media.LaptopAndUp>
                    {LINKS.NAVLINKS.slice(-1).map(renderDesktopLink)}
                  </Media.LaptopAndUp>
                  <div className={'universal-navbar-paddingLeft'}>
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
  hideMobileCta: PropTypes.bool.isRequired,
  trackCtaClick: PropTypes.func.isRequired,
  link: PropTypes.node,
}

UniversalNavbar.defaultProps = {
  hideMobileCta: false,
  trackCtaClick: () => {},
}

export { UniversalNavbar }
