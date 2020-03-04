import React, { useState } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import FancyAnimatedLogo from '../UniversalNavbar/FancyAnimatedLogo'
import LogoNotAnimated from '../UniversalNavbar/assets/ethos-logo-black.js'
import LogoWhite from '../UniversalNavbar/assets/ethos-logo-white.js'
import {
  AccountIcon,
  SearchIcon,
  AccordionToggleIcon,
  DropdownParentIcon,
  DropdownLinkIcon,
} from '../UniversalNavbar/assets/icons.js'
import { Button, Layout, TitleMedium, TitleSmall, Footnote } from '../index'
import NavLink from '../UniversalNavbar/NavLink'
import TransformingBurgerButton from '../UniversalNavbar/TransformingBurgerButton/TransformingBurgerButton'
import DropDownCta from './DropDownCta'
import styles from './UniversalNavbarExpanded.module.scss'

// TODO move this to helpers?
const ENTER_KEY_CODE = 13
const isEnterKeyPress = (event) => {
  if (
    event.key === 'Enter' ||
    event.which === ENTER_KEY_CODE ||
    event.keyCode === ENTER_KEY_CODE
  ) {
    return true
  } else {
    return false
  }
}

// TODO: 'talk to us' CTA integration once Kustomer is implemented
// TODO: smallest laptop size, lower width between subitems w/shorter text
// TODO: replace blue outline on focus with cleaner white underline
// TODO:  Split main file into separate component files
// TODO:  Update test descriptions / more tests
// TODO:  JS Docs
// TODO:  more code commenting in general
// TODO:  PropTypes review

// ====: I think this one is fixed but have to test on CMS.
// TODO: 3/2/20 QA: Reduce padding between "check my price" CTA and hamburger icon on scrolled mobile nav (low priority) right 44px override not working for scrolled CTA in navbar on mobile

const UniversalNavbarExpanded = ({
  LinkComponent,
  hideMobileCta,
  hideDesktopCta,
  logoHref,
  trackCtaClick,
  links,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [activeAccordionItem, setActiveAccordionItem] = useState(false)

  const toggleHamburger = () => {
    if (!showMobileMenu) {
      setShowMobileMenu(true)
    } else {
      setShowMobileMenu(false)
    }
  }

  const handleHamburgerKeyPress = (event) => {
    if (isEnterKeyPress(event)) {
      toggleHamburger()
    }
  }

  const toggleAccordionItem = (toggledItem) => {
    setActiveAccordionItem(
      activeAccordionItem === toggledItem ? false : toggledItem
    )
  }

  const handleAccordionItemKeyPress = (event, index) => {
    if (isEnterKeyPress(event)) {
      toggleAccordionItem(index)
    }
  }

  const textStart = (text) => {
    const alteredText = text.trim().split(' ')
    return `${alteredText.slice(0, alteredText.length - 1).join(' ')} `
  }

  const textEnd = (text) => {
    return (
      <span>
        {text
          .trim()
          .split(' ')
          .pop()}
      </span>
    )
  }

  const NavLinkReduced = ({ className, key, href, children }) => (
    <NavLink
      className={className}
      key={key ? key : null}
      href={href}
      LinkComponent={LinkComponent}
    >
      {children}
    </NavLink>
  )

  NavLinkReduced.propTypes = {
    className: PropTypes.string,
    key: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node,
  }

  const CtaButtonClasses = [
    'cta-button',
    'navbar-expanded',
    'show-when-scrolled',
  ]
  const CtaButton = () => (
    <a
      className={CtaButtonClasses.join(' ')}
      onClick={trackCtaClick}
      href={links.TERM.href}
    >
      <Button.Small.Black>Check my price</Button.Small.Black>
    </a>
  )

  const SearchIconLink = () => (
    <NavLinkReduced className={styles.searchIcon} href={links.SEARCH.href}>
      <SearchIcon />
    </NavLinkReduced>
  )

  const AccountIconLink = () => (
    <NavLinkReduced className={styles.accountIcon} href={links.ACCOUNT.href}>
      <AccountIcon />
    </NavLinkReduced>
  )

  const AccordionNav = () => (
    <div className={styles.accordion}>
      {links.NAVLINKS.map((link, idx) => (
        <div
          key={link.id}
          className={
            idx === activeAccordionItem
              ? [styles.accordionItem, styles.active].join(' ')
              : styles.accordionItem
          }
          onClick={() => toggleAccordionItem(idx)}
          onKeyPress={(e) => handleAccordionItemKeyPress(e, idx)}
          tabIndex={0}
          role="button"
        >
          <div className={styles.accordionParent}>
            <TitleMedium.Sans.Regular400>
              {link.title}
            </TitleMedium.Sans.Regular400>
            <AccordionToggleIcon />
          </div>
          <div className={styles.accordionChildren}>
            <div
              key={get(link, 'subnav.cta.id')}
              className={styles.accordionChild}
            >
              <TitleSmall.Sans.Light300>
                <NavLinkReduced href={get(link, 'subnav.cta.href')}>
                  {get(link, 'subnav.cta.title')}
                </NavLinkReduced>
              </TitleSmall.Sans.Light300>
            </div>
            {get(link, 'subnav.items').map((link) => (
              <div key={link.id} className={styles.accordionChild}>
                <TitleSmall.Sans.Light300>
                  <NavLinkReduced href={link.href}>{link.title}</NavLinkReduced>
                </TitleSmall.Sans.Light300>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const BelowAccordion = () => (
    <div className={styles.belowAccordion}>
      <div className={styles.belowAccordionItem}>
        <NavLinkReduced href={links.TERM.href}>
          <TitleMedium.Sans.Regular400>
            {links.TERM.title}
          </TitleMedium.Sans.Regular400>
        </NavLinkReduced>
      </div>
      <div className={styles.belowAccordionItem}>
        <NavLinkReduced href={links.ACCOUNT.href}>
          <TitleMedium.Sans.Regular400>
            {links.ACCOUNT.title}
          </TitleMedium.Sans.Regular400>
        </NavLinkReduced>
      </div>
      <div className={styles.belowAccordionItem}>
        <NavLinkReduced href={links.SEARCH.href}>
          <TitleMedium.Sans.Regular400>
            {links.SEARCH.title}
          </TitleMedium.Sans.Regular400>
        </NavLinkReduced>
      </div>
    </div>
  )

  const MobileMenuClasses = ['isFixedCta', styles.phoneAndTablet]
  if (showMobileMenu) {
    MobileMenuClasses.push(styles.visible)
  }
  const MobileMenu = () => (
    <div className={MobileMenuClasses.join(' ')}>
      <div
        className={showMobileMenu ? styles.mobileMenu : styles.hideMobileMenu}
      >
        <NavLinkReduced href={logoHref} className={styles.phoneLogo}>
          {LogoWhite({ className: styles.logo })}
        </NavLinkReduced>

        <div className={styles.hamburger}>
          <TransformingBurgerButton
            showMobileMenu={showMobileMenu}
            clickHandler={() => toggleHamburger()}
            keyPressHandler={(e) => handleHamburgerKeyPress(e)}
          />
        </div>
        <AccordionNav />
        <BelowAccordion />
      </div>
      {/* Mobile menu items, getAnEstimate only shows when scrolled */}
      <NavLinkReduced href={logoHref} className={styles.phoneLogoFancy}>
        <FancyAnimatedLogo />
      </NavLinkReduced>
      {!hideMobileCta && <CtaButton />}
      <SearchIconLink />
    </div>
  )

  const DropDownChildren = ({ child }) => (
    <div className={styles.dropdownNavChildren}>
      <Layout.HorizontallyPaddedContainer>
        <div className={styles.dropdownNavChildrenInner}>
          <div className={styles.dropdownNavChildrenCta}>
            {child.subnav &&
              get(child, 'subnav.cta') &&
              get(child, 'subnav.cta.href') && (
                <NavLinkReduced href={get(child, 'subnav.cta.href')}>
                  <DropDownCta
                    title={get(child, 'subnav.cta.title')}
                    subcopy={get(child, 'subnav.cta.subcopy')}
                  />
                </NavLinkReduced>
              )}
          </div>
          <div className={styles.dropdownNavChildrenItems}>
            {child.subnav.items.map((link) => (
              <div className={styles.dropdownNavChild} key={link.id}>
                <Footnote.Regular400>
                  <NavLinkReduced href={link.href}>
                    <div className={styles.dropdownNavChildLink}>
                      <span>{textStart(link.title)}</span>
                      <div className={styles.dropdownNavChildTextIcon}>
                        {textEnd(link.title)}
                        <DropdownLinkIcon />
                      </div>
                    </div>
                  </NavLinkReduced>
                </Footnote.Regular400>
              </div>
            ))}
          </div>
        </div>
      </Layout.HorizontallyPaddedContainer>
    </div>
  )

  DropDownChildren.propTypes = {
    child: PropTypes.object,
  }

  const DesktopMenu = () => (
    <div className={styles.laptopAndUp}>
      <div className={styles.laptopAndUpContainer}>
        {/* Desktop menu items to the left */}
        <div className={`${styles.flex} ${styles.itemsCenter}`}>
          <NavLinkReduced href={logoHref}>
            {LogoNotAnimated({ className: styles.logo })}
          </NavLinkReduced>
          <div className={styles.dropdownNav}>
            {links.NAVLINKS.map((link) => (
              <div className={styles.dropdownNavParent} key={link.id}>
                <Footnote.Regular400>
                  {link.title}
                  <span className={styles.dropdownNavParentIcon}>
                    <DropdownParentIcon />
                  </span>
                </Footnote.Regular400>
                <DropDownChildren child={link} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop menu items to the right */}
        <div className={`${styles.flex} ${styles.itemsCenter}`}>
          <SearchIconLink />
          <AccountIconLink />
          <div className={styles.cta}>{!hideDesktopCta && <CtaButton />}</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.blockNavbar}>
      <div className={styles.navbar}>
        <Layout.ScrollDetector>
          <div className={styles.hamburger}>
            <TransformingBurgerButton
              showMobileMenu={showMobileMenu}
              clickHandler={() => toggleHamburger()}
              keyPressHandler={(e) => handleHamburgerKeyPress(e)}
            />
          </div>
          <MobileMenu />
          <DesktopMenu />
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
