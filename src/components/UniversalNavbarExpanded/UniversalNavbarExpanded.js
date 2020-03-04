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
import { removeLastWord, getLastWord } from '../../helpers/splitLastWord'
import { isEnterKeyPress } from '../../helpers/isEnterKeyPress'

// TODO:  Split main file into separate component files
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

  const handleSamePage = (event, href, keyPress) => {
    if (typeof window === 'undefined' || !showMobileMenu) return
    if (keyPress) {
      if (!isEnterKeyPress(event)) return
    }
    const pathOnly = window.location.href.replace(window.location.origin, '')
    if (pathOnly === href) {
      event.preventDefault()
      toggleHamburger()
    }
  }

  const NavLinkReduced = ({
    className,
    key,
    href,
    samePageAwareness,
    children,
  }) => {
    if (samePageAwareness) {
      return (
        <NavLink
          className={className}
          key={key ? key : null}
          href={href}
          LinkComponent={LinkComponent}
          onClick={(e) => handleSamePage(e, href)}
          onKeyPress={(e) => handleSamePage(e, href, true)}
        >
          {children}
        </NavLink>
      )
    } else {
      return (
        <NavLink
          className={className}
          key={key ? key : null}
          href={href}
          LinkComponent={LinkComponent}
        >
          {children}
        </NavLink>
      )
    }
  }

  NavLinkReduced.propTypes = {
    className: PropTypes.string,
    key: PropTypes.string,
    href: PropTypes.string.isRequired,
    samePageAwareness: PropTypes.bool,
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
        >
          <div
            className={styles.accordionParent}
            onClick={() => toggleAccordionItem(idx)}
            onKeyPress={(e) => handleAccordionItemKeyPress(e, idx)}
            tabIndex={0}
            role="button"
          >
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
                <NavLinkReduced
                  href={get(link, 'subnav.cta.href')}
                  samePageAwareness={true}
                >
                  {get(link, 'subnav.cta.title')}
                </NavLinkReduced>
              </TitleSmall.Sans.Light300>
            </div>
            {get(link, 'subnav.items').map((link) => (
              <div key={link.id} className={styles.accordionChild}>
                <TitleSmall.Sans.Light300>
                  <NavLinkReduced href={link.href} samePageAwareness={true}>
                    {link.title}
                  </NavLinkReduced>
                </TitleSmall.Sans.Light300>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const BELOW_ACCORDION_LINKS = [links.TERM, links.ACCOUNT, links.SEARCH]
  const BelowAccordion = () => (
    <div className={styles.belowAccordion}>
      {BELOW_ACCORDION_LINKS.map((link, index) => (
        <div
          className={styles.belowAccordionItem}
          key={`belowAccordion${index}`}
        >
          <NavLinkReduced href={link.href} samePageAwareness={true}>
            <TitleMedium.Sans.Regular400>
              {link.title}
            </TitleMedium.Sans.Regular400>
          </NavLinkReduced>
        </div>
      ))}
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
        <NavLinkReduced
          href={logoHref}
          className={styles.phoneLogo}
          samePageAwareness={true}
        >
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

  const DropDownChildren = ({ child }) => {
    const columns = [[], []]
    const childItems = get(child, 'subnav.items')
    for (var i = 0; i < childItems.length; i++) {
      if (i % 2 === 0) {
        columns[0].push(childItems[i])
      } else {
        columns[1].push(childItems[i])
      }
    }

    return (
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
              {columns.map((column, idx) => (
                <div
                  className={styles.dropdownNavChildrenColumn}
                  key={`navChildColumn${idx}`}
                >
                  {column.map((link) => (
                    <div className={styles.dropdownNavChild} key={link.id}>
                      <Footnote.Regular400>
                        <NavLinkReduced href={link.href}>
                          <div className={styles.dropdownNavChildLink}>
                            <span>{removeLastWord(link.title)}</span>
                            <div className={styles.dropdownNavChildTextIcon}>
                              <span>{getLastWord(link.title)}</span>
                              <DropdownLinkIcon />
                            </div>
                          </div>
                        </NavLinkReduced>
                      </Footnote.Regular400>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Layout.HorizontallyPaddedContainer>
      </div>
    )
  }

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
