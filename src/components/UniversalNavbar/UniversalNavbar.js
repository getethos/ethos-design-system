import React from 'react'

import FancyAnimatedLogo from './FancyAnimatedLogo'
import LogoNotAnimated from './assets/ethos-logo-black.svg'
import LogoWhite from './assets/ethos-logo-white.svg'
import {
  Media,
  Button,
  Layout,
  Spacer,
  TitleXLarge,
  // } from 'frontend/packages/design-system' // Funnel
} from '../index' // CMS
import TransformingBurgerButton from './TransformingBurgerButton/TransformingBurgerButton'

// TODO REDESIGN: Lots of sloppy inline styles here.

/**
 * WIP
 * Almost definitely not the correct way to navigate to a page...
 * Also won't work on CMS
 */
const navbarLinks = [
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
]

class UniversalNavbar extends React.Component {
  state = {
    showMobileMenu: false,
  }

  toggleHamburger = () => {
    this.setState({ showMobileMenu: !this.state.showMobileMenu })
  }

  render() {
    const getAnEstimate = (showWhenScrolled) => (
      <a
        className={
          'get-an-estimate ' + (showWhenScrolled ? 'show-when-scrolled' : '')
        }
        href="/term"
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
        <a href={l.href}>{l.title}</a>
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
            <Media.PhoneOnly>
              {/* Hamburger button */}
              <div style={{ zIndex: 2, position: 'fixed', top: 24, right: 24 }}>
                <TransformingBurgerButton
                  showMobileMenu={showMobileMenu}
                  clickHandler={this.toggleHamburger}
                />
              </div>
              <div
                className={
                  'universal-navbar-root' +
                  ' ' +
                  'universal-navbar-mobileRoot' +
                  ' flex items-center justify-between'
                }
              >
                {/* Dark green mobile menu, shows up when hamburger is clicked*/}
                <div
                  className={
                    showMobileMenu ? 'shownMobileMenu' : 'hiddenMobileMenu'
                  }
                >
                  <a href="/">
                    <img
                      className={'universal-navbar-logo'}
                      src={LogoWhite}
                      alt="Ethos"
                    />
                  </a>
                  <Spacer.H56 />
                  {navbarLinks.map((l) => (
                    <div key={l.title + 'mobile'} style={{ marginBottom: 24 }}>
                      <TitleXLarge.Sans.Regular400>
                        <a key={l.title + 'mobile'} href={l.href}>
                          {l.title}
                        </a>
                      </TitleXLarge.Sans.Regular400>
                    </div>
                  ))}
                  <div style={{ position: 'absolute', bottom: 40 }}>
                    <a href="/term">
                      <Button.Medium.BlackOutline>
                        Check my price
                      </Button.Medium.BlackOutline>
                    </a>
                  </div>
                </div>

                {/* Mobile menu items, getAnEstimate only shows when scrolled */}
                <a href="/">
                  <FancyAnimatedLogo />
                </a>
                {getAnEstimate(true)}
              </div>
            </Media.PhoneOnly>

            <Media.TabletAndUp>
              <div className={'universal-navbar-root'}>
                <div
                  className={'universal-navbar-rootChild flex justify-between'}
                >
                  {/* Desktop menu items to the left */}
                  <div className="flex items-center">
                    <a href="/">
                      <img
                        className={'universal-navbar-logo'}
                        src={LogoNotAnimated}
                        alt="Ethos"
                      />
                    </a>
                    {renderDesktopLink(navbarLinks[0])}
                    {renderDesktopLink(navbarLinks[1])}
                    <Media.LaptopAndUp>
                      {renderDesktopLink(navbarLinks[2])}
                    </Media.LaptopAndUp>
                  </div>

                  {/* Desktop menu items to the right */}
                  <div className="flex items-center">
                    <Media.LaptopAndUp>
                      {navbarLinks.slice(-1).map(renderDesktopLink)}
                    </Media.LaptopAndUp>
                    <div className={'universal-navbar-paddingLeft'}>
                      {getAnEstimate(false)}
                    </div>
                  </div>
                </div>
              </div>
            </Media.TabletAndUp>
          </Layout.ScrollDetector>
        </div>
      </div>
    )
  }
}

export { UniversalNavbar }
