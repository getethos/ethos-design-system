import React, { useState } from 'react'
import PropTypes from 'prop-types'

import FancyAnimatedLogo from '../../UniversalNavbar/FancyAnimatedLogo'
import LogoWhite from '../../UniversalNavbar/assets/ethos-logo-white.js'
import TransformingBurgerButton from '../../UniversalNavbar/TransformingBurgerButton/TransformingBurgerButton'
import AccordionNav from './AccordionNav'
import BelowAccordion from './BelowAccordion'
import CtaButton from '../CtaButton'
import NavLink from '../NavLink'
import { isEnterKeyPress } from '../../../helpers/isEnterKeyPress'
import styles from './MobileNavbar.module.scss'

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

const MobileNavbar = ({
  extraClass,
  logoHref,
  links,
  belowAccordionLinks,
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
  const MobileNavbarClasses = [extraClass, styles.mobileNavbar]
  if (showMobileMenu) {
    MobileNavbarClasses.push(styles.visible)
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
      <div className={MobileNavbarClasses.join(' ')}>
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
          <BelowAccordion
            links={belowAccordionLinks}
            className={styles.belowAccordion}
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

export default MobileNavbar
