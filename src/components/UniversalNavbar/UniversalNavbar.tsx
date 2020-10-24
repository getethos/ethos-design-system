import * as React from 'react'
import { useState } from 'react'
import { Button, Layout, Spacer, TitleXLarge } from '../index'
import LogoNotAnimated from './assets/ethos-logo-black.js'
import LogoWhite from './assets/ethos-logo-white.js'
import { AccountIcon, SearchIcon } from './assets/icons'
import { LINKS } from './constants'
import FancyAnimatedLogo from './FancyAnimatedLogo'
import NavLink from './NavLink'
import TransformingBurgerButton from './TransformingBurgerButton/TransformingBurgerButton'
import styles from './UniversalNavbar.module.scss'
type UniversalNavbarProps = {
  hideMobileCta?: boolean
  hideDesktopCta?: boolean
  trackCtaClick?: (...args: any[]) => any
  LinkComponent?: React.ElementType
  logoHref?: string
}
const UniversalNavbar: React.FC<UniversalNavbarProps> = ({
  LinkComponent,
  hideMobileCta,
  hideDesktopCta,
  logoHref,
  trackCtaClick,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const toggleHamburger = () => {
    setShowMobileMenu(!showMobileMenu)
  }
  const handleHamburgerKeyPress = (event) => {
    if (event.key === 'Enter') {
      toggleHamburger()
    }
  }
  const renderCtaButton = (showWhenScrolled) => (
    <a
      className={'cta-button ' + (showWhenScrolled ? 'show-when-scrolled' : '')}
      onClick={trackCtaClick}
      href={LINKS.TERM.href}
    >
      <Button.Small.BlackOutline>Check my price</Button.Small.BlackOutline>
    </a>
  )
  const renderTextLink = (link) => (
    <div key={link.id} className={styles.textLink}>
      <NavLink href={link.href} LinkComponent={LinkComponent}>
        {link.title}
      </NavLink>
    </div>
  )
  // These are bespoke icons but design may replace w/FA at a later date
  const renderSearchIcon = (link) => {
    return (
      <NavLink
        className={styles.searchIcon}
        key={link.id}
        href={link.href}
        LinkComponent={LinkComponent}
      >
        <SearchIcon />
      </NavLink>
    )
  }
  const renderAccountIcon = (link) => {
    return (
      <NavLink
        className={styles.accountIcon}
        key={link.id}
        href={link.href}
        LinkComponent={LinkComponent}
      >
        <AccountIcon />
      </NavLink>
    )
  }
  return (
    <div className={styles.blockNavbar} role="navigation">
      <div className={styles.navbar}>
        <Layout.ScrollDetector>
          <div className={styles.hamburger}>
            <TransformingBurgerButton
              showMobileMenu={showMobileMenu}
              clickHandler={toggleHamburger}
              keyPressHandler={handleHamburgerKeyPress}
            />
          </div>

          <div className={styles.phoneOnly}>
            <div
              className={
                showMobileMenu ? styles.mobileMenu : styles.hideMobileMenu
              }
            >
              <NavLink
                href={logoHref || ''}
                LinkComponent={LinkComponent}
                className={styles.phoneLogo}
              >
                {LogoWhite({ className: styles.logo })}
              </NavLink>
              <Spacer.H56 />
              {LINKS.NAVLINKS.map((link) => (
                <div key={link.id} className={styles.navLink}>
                  <TitleXLarge.Sans.Regular400>
                    <NavLink href={link.href} LinkComponent={LinkComponent}>
                      {link.title}
                    </NavLink>
                  </TitleXLarge.Sans.Regular400>
                </div>
              ))}
              <div className={styles.ctaButton}>
                <a href={LINKS.TERM.href}>
                  <Button.Medium.WhiteOutline>
                    Check my price
                  </Button.Medium.WhiteOutline>
                </a>
              </div>
            </div>

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
              <div className={`${styles.flex} ${styles.itemsCenter}`}>
                <NavLink href={logoHref || ''} LinkComponent={LinkComponent}>
                  {LogoNotAnimated({ className: styles.logo })}
                </NavLink>
                {renderTextLink(LINKS.NAVLINKS[0])}
                {renderTextLink(LINKS.NAVLINKS[1])}
                <div className={styles.laptopAndUp}>
                  {renderTextLink(LINKS.NAVLINKS[2])}
                </div>
              </div>

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
UniversalNavbar.defaultProps = {
  hideMobileCta: false,
  hideDesktopCta: false,
  logoHref: LINKS.INDEX.href,
  trackCtaClick: () => {},
}
export { UniversalNavbar }
