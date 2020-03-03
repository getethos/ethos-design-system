import React from 'react'
import PropTypes from 'prop-types'

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
import {
  Body,
  Button,
  Layout,
  Spacer,
  TitleMedium,
  TitleSmall,
  Footnote,
  COLORS,
} from '../index'
import TransformingBurgerButton from '../UniversalNavbar/TransformingBurgerButton/TransformingBurgerButton'
import { LINKS } from './constants.js'
import NavLink from '../UniversalNavbar/NavLink'
import styles from './UniversalNavbarExpanded.module.scss'

// TODO: Dry up this prop usage for NavLink
// LinkComponent={
//   link.href !== '/login/'
//     ? LinkComponent
//     : null
// }

// TODO: alternate caret weight for DropdownParentIcon pre:hover
// TODO: 'talk to us' CTA integration once Kustomer is implemented
// TODO: adjust width of bottom forest border on parent links
// TODO: smallest laptop size, lower width between subitems w/shorter text
// TODO: set subnav height to largest
// TODO: arrow on same line as individual link
// TODO: replace blue outline on focus with cleaner white underline
// TODO: remove clickability of right side of accordion submenu
// TODO: 3/2/20 QA: Add 1px stroke (#000000 20%) beneath default navbar and underneath dropdown when it's open (low priority)
// TODO: 3/2/20 QA: Reduce padding between "check my price" CTA and hamburger icon on scrolled mobile nav (low priority)
// TODO: 3/2/20 QA: Side arrow breaks to new line for one of the menu items on laptop size (low priority)
// TODO: right 44px override not working for scrolled CTA in navbar on mobile
// TODO:  Create a constant for the 13 keycode
// TODO:  Do an array and join(' ') like in the other components for classNames
// TODO:  Make a helper function that checks for /login/
// TODO:  Split main file into separate components
// TODO:  Update test descriptions / more tests
// TODO:  Implement lodash/get usage for nested props
// TODO:  FancyAnimatedLogo functional component
// TODO:  use .map instead of checking for .length > 0 (2 places)
// TODO:  z index variables
// TODO:  JS Docs
// TODO:  more code commenting in general
// TODO:  PropTypes review
// TODO:  LINKS constant passed in from CMS

// TODO: convert from class to hook?
class UniversalNavbarExpanded extends React.Component {
  state = {
    showMobileMenu: false,
    activeAccordionItem: false,
  }

  toggleHamburger = () => {
    this.setState({ showMobileMenu: !this.state.showMobileMenu })
  }

  handleHamburgerKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.toggleHamburger()
    }
  }

  toggleAccordionItem = (toggledItem) => {
    this.setState({
      activeAccordionItem:
        this.state.activeAccordionItem === toggledItem ? false : toggledItem,
    })
  }

  handleAccordionItemKeyPress = (event, index) => {
    if (event.key === 'Enter' || event.which == 13 || event.keyCode == 13) {
      this.toggleAccordionItem(index)
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
        <Button.Small.Black>Check my price</Button.Small.Black>
      </a>
    )

    const { showMobileMenu, activeAccordionItem } = this.state

    const renderSearchIcon = (link) => {
      return (
        <NavLink
          className={styles.searchIcon}
          key={link.id}
          href={link.href}
          LinkComponent={link.href !== '/login/' ? LinkComponent : null}
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
          LinkComponent={link.href !== '/login/' ? LinkComponent : null}
        >
          <AccountIcon />
        </NavLink>
      )
    }

    const Hamburger = () => (
      <div className={styles.hamburger}>
        <TransformingBurgerButton
          showMobileMenu={showMobileMenu}
          clickHandler={this.toggleHamburger}
          keyPressHandler={this.handleHamburgerKeyPress}
        />
      </div>
    )

    return (
      <div className={styles.blockNavbar}>
        <div className={styles.navbar}>
          <Layout.ScrollDetector>
            <Hamburger />
            <div
              className={
                showMobileMenu
                  ? [styles.phoneAndTablet, styles.visible].join(' ')
                  : styles.phoneAndTablet
              }
            >
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
                <Hamburger />
                <div className={styles.accordion}>
                  {LINKS.NAVLINKS.map((link, idx) => (
                    <div
                      key={link.id}
                      className={
                        idx === activeAccordionItem
                          ? [styles.accordionItem, styles.active].join(' ')
                          : styles.accordionItem
                      }
                      onClick={() => this.toggleAccordionItem(idx)}
                      onKeyPress={(e) =>
                        this.handleAccordionItemKeyPress(e, idx)
                      }
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
                          key={link.subnav.cta.id}
                          className={styles.accordionChild}
                        >
                          <TitleSmall.Sans.Light300>
                            <NavLink
                              href={link.subnav.cta.href}
                              LinkComponent={
                                link.subnav.cta.href !== '/login/'
                                  ? LinkComponent
                                  : null
                              }
                            >
                              {link.subnav.cta.title}
                            </NavLink>
                          </TitleSmall.Sans.Light300>
                        </div>
                        {link.subnav &&
                          link.subnav.items.length > 0 &&
                          link.subnav.items.map((link) => (
                            <div
                              key={link.id}
                              className={styles.accordionChild}
                            >
                              <TitleSmall.Sans.Light300>
                                <NavLink
                                  href={link.href}
                                  LinkComponent={
                                    link.href !== '/login/'
                                      ? LinkComponent
                                      : null
                                  }
                                >
                                  {link.title}
                                </NavLink>
                              </TitleSmall.Sans.Light300>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.belowAccordion}>
                  <div className={styles.belowAccordionItem}>
                    <NavLink
                      href={LINKS.TERM.href}
                      LinkComponent={
                        LINKS.TERM.href !== '/login/' ? LinkComponent : null
                      }
                    >
                      <TitleMedium.Sans.Regular400>
                        {LINKS.TERM.title}
                      </TitleMedium.Sans.Regular400>
                    </NavLink>
                  </div>
                  <div className={styles.belowAccordionItem}>
                    <NavLink
                      href={LINKS.ACCOUNT.href}
                      LinkComponent={
                        LINKS.ACCOUNT.href !== '/login/' ? LinkComponent : null
                      }
                    >
                      <TitleMedium.Sans.Regular400>
                        {LINKS.ACCOUNT.title}
                      </TitleMedium.Sans.Regular400>
                    </NavLink>
                  </div>
                  <div className={styles.belowAccordionItem}>
                    <NavLink
                      href={LINKS.SEARCH.href}
                      LinkComponent={
                        LINKS.SEARCH.href !== '/login/' ? LinkComponent : null
                      }
                    >
                      <TitleMedium.Sans.Regular400>
                        {LINKS.SEARCH.title}
                      </TitleMedium.Sans.Regular400>
                    </NavLink>
                  </div>
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
              {renderSearchIcon(LINKS.SEARCH)}
            </div>

            <div className={styles.laptopAndUp}>
              <div className={styles.laptopAndUpContainer}>
                {/* Desktop menu items to the left */}
                <div className={`${styles.flex} ${styles.itemsCenter}`}>
                  <NavLink href={logoHref} LinkComponent={LinkComponent}>
                    {LogoNotAnimated({ className: styles.logo })}
                  </NavLink>
                  <div className={styles.dropdownNav}>
                    {LINKS.NAVLINKS.map((link) => (
                      <div className={styles.dropdownNavParent} key={link.id}>
                        <Footnote.Regular400>
                          {link.title}
                          <span className={styles.dropdownNavParentIcon}>
                            <DropdownParentIcon />
                          </span>
                        </Footnote.Regular400>
                        <div className={styles.dropdownNavChildren}>
                          <Layout.HorizontallyPaddedContainer>
                            <div className={styles.dropdownNavChildrenInner}>
                              <div className={styles.dropdownNavChildrenCta}>
                                {link.subnav &&
                                  link.subnav.cta &&
                                  link.subnav.cta.href && (
                                    <NavLink
                                      href={link.subnav.cta.href}
                                      LinkComponent={
                                        link.subnav.cta.href !== '/login/'
                                          ? LinkComponent
                                          : null
                                      }
                                    >
                                      {link.subnav.cta.title && (
                                        <TitleSmall.Serif.Book500>
                                          <span>{link.subnav.cta.title}</span>
                                          <DropdownLinkIcon />
                                        </TitleSmall.Serif.Book500>
                                      )}
                                      <Spacer.H8 />
                                      {link.subnav.cta.subcopy && (
                                        <Body.Regular400
                                          color={COLORS.GRAY_SECONDARY}
                                        >
                                          {link.subnav.cta.subcopy}
                                        </Body.Regular400>
                                      )}
                                    </NavLink>
                                  )}
                              </div>
                              <div className={styles.dropdownNavChildrenItems}>
                                {link.subnav &&
                                  link.subnav.items.length > 0 &&
                                  link.subnav.items.map((link) => (
                                    <div
                                      className={styles.dropdownNavChild}
                                      key={link.id}
                                    >
                                      <Footnote.Regular400>
                                        <NavLink
                                          href={link.href}
                                          LinkComponent={
                                            link.href !== '/login/'
                                              ? LinkComponent
                                              : null
                                          }
                                        >
                                          <span>{link.title}</span>
                                          <DropdownLinkIcon />
                                        </NavLink>
                                      </Footnote.Regular400>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </Layout.HorizontallyPaddedContainer>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop menu items to the right */}
                <div className={`${styles.flex} ${styles.itemsCenter}`}>
                  {renderSearchIcon(LINKS.SEARCH)}
                  {renderAccountIcon(LINKS.ACCOUNT)}
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
  logoHref: PropTypes.string,
}

UniversalNavbarExpanded.defaultProps = {
  hideMobileCta: false,
  hideDesktopCta: false,
  logoHref: LINKS.INDEX.href,
  trackCtaClick: () => {},
}

export { UniversalNavbarExpanded }
