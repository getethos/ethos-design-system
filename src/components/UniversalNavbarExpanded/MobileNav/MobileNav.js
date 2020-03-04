import React, { useState } from 'react'
import PropTypes from 'prop-types'

import FancyAnimatedLogo from '../../UniversalNavbar/FancyAnimatedLogo'
import LogoWhite from '../../UniversalNavbar/assets/ethos-logo-white.js'
import TransformingBurgerButton from '../../UniversalNavbar/TransformingBurgerButton/TransformingBurgerButton'
import AccordionNav from './AccordionNav'
import LinkList from './LinkList'
import CtaButton from '../CtaButton'
import NavLink from '../NavLink'
import { isEnterKeyPress } from '../../../helpers/isEnterKeyPress'
import styles from './MobileNav.module.scss'

const BaseHamburger = ({
  className,
  visibleState,
  clickHandler,
  keyPressHandler,
}) => {
  return (
    <div className={className}>
      <TransformingBurgerButton
        showMobileMenu={visibleState}
        clickHandler={() => clickHandler()}
        keyPressHandler={(e) => keyPressHandler(e)}
      />
    </div>
  )
}

BaseHamburger.propTypes = {
  className: PropTypes.string.isRequired,
  visibleState: PropTypes.bool,
  clickHandler: PropTypes.func,
  keyPressHandler: PropTypes.func,
}

const MobileNav = ({
  extraClass,
  logoHref,
  links,
  linkListLinks,
  hideMobileCta,
  ctaButtonTrackingFunction,
  LinkComponent,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
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
  const MobileNavClasses = [extraClass, styles.mobileNavbar]
  if (showMobileMenu) {
    MobileNavClasses.push(styles.visible)
  }

  const Hamburger = () => (
    <BaseHamburger
      className={styles.hamburger}
      visibleState={showMobileMenu}
      clickHandler={() => toggleHamburger()}
      keyPressHandler={(e) => handleHamburgerKeyPress(e)}
    />
  )

  return (
    <>
      <Hamburger />
      <div className={MobileNavClasses.join(' ')}>
        <div
          className={showMobileMenu ? styles.mobileMenu : styles.hideMobileMenu}
        >
          <NavLink
            className={styles.phoneLogo}
            href={logoHref}
            samePageAwareness={true}
            samePageFunction={(e) => toggleHamburger(e)}
            samePageCondition={showMobileMenu}
            LinkComponent={LinkComponent}
          >
            {LogoWhite({ className: styles.logo })}
          </NavLink>
          <Hamburger />
          <AccordionNav
            extraClass={styles.accordion}
            links={links}
            samePageFunction={(e) => toggleHamburger(e)}
            samePageCondition={showMobileMenu}
            LinkComponent={LinkComponent}
          />
          <LinkList
            links={linkListLinks}
            className={styles.linkList}
            samePageFunction={(e) => toggleHamburger(e)}
            samePageCondition={showMobileMenu}
            LinkComponent={LinkComponent}
          />
        </div>
        {/* Mobile menu items, getAnEstimate only shows when scrolled */}
        <NavLink
          className={styles.phoneLogoFancy}
          href={logoHref}
          LinkComponent={LinkComponent}
        >
          <FancyAnimatedLogo />
        </NavLink>
        {!hideMobileCta && (
          <CtaButton
            href={links.CTA.href}
            trackingFunction={ctaButtonTrackingFunction}
          />
        )}
      </div>
    </>
  )
}

MobileNav.propTypes = {
  links: PropTypes.object.isRequired,
  extraClass: PropTypes.string,
  ctaButtonTrackingFunction: PropTypes.func,
  LinkComponent: PropTypes.object,
  logoHref: PropTypes.string,
  linkListLinks: PropTypes.array.isRequired,
  hideMobileCta: PropTypes.bool,
}

export default MobileNav
