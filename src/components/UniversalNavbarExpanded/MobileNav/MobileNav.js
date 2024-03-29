import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// Reused assets from UniversalNavbar
import FancyAnimatedLogo from '../../UniversalNavbar/FancyAnimatedLogo'
import LogoGreen from '../../UniversalNavbar/assets/ethos-logo-green'
import TransformingBurgerButton from '../../UniversalNavbar/TransformingBurgerButton/TransformingBurgerButton'

// Parent component (UniversalNavbar) siblings
import CtaButton from '../CtaButton'
import NavLink from '../NavLink'

// MobileNav siblings
import AccordionNav from './AccordionNav'
import SecondaryLinks from './SecondaryLinks'

// Helpers
import { isEnterKeyPress } from '../../../helpers/isEnterKeyPress'

// Styles
import styles from './MobileNav.module.scss'

/**
 * Extension of UniversalNavbar/TransformingBurgerButton, reused twice in the MobileNav
 *
 * @param {string} className - Extra top level class
 * @param {boolean} visibleState - State for tracking visibility of MobileNav
 * @param {function} clickHandler - Toggle function for visibleState
 * @param {function} keyPressHandler - Toggle function for visibleState
 *
 * @return {JSX.Element}
 */
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
  visibleState: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
  keyPressHandler: PropTypes.func.isRequired,
}

/**
 * Mobile navigation component for UniversalNavbar.
 * Uses a full screen modal containing a dropdown accordion system and static link list.
 *
 * TODO Make the link list optional for better reusability
 *
 * @param {string} ctaButtonStyle - 'Black' | 'BlackOutline'
 * @param {object} links - URLs and text for accordion
 * @param {string} extraClass - Extra top level class
 * @param {function} ctaButtonTrackingFunction - Analytics function run when CTA Button is clicked
 * @param {function} itemTrackingFunction - Analytics tracking function
 * @param {object} LinkComponent - Agnotistic Reach and React Router Link (ex. Gatsby's <Link>)
 * @param {string} logoHref - Href for the logo
 * @param {array} secondaryLinksLinks - List of links for static display below accordion
 * @param {boolean} hideMobileCta - Hide the cta
 * @param {object} singleCta = { href: string, title: string } - A single CTA Title/URL to link to in a reduced version of the navbar
 * @param {boolean} animateNavbar - navigation bar animation
 * @param {node} partnerLogoMobile - image should be 24px height and width maximum 100px. Image format could be any.
 *
 * @return {JSX.Element}
 */
const MobileNav = ({
  ctaButtonStyle,
  extraClass,
  logoHref,
  links,
  secondaryLinksLinks,
  hideMobileCta,
  ctaButtonTrackingFunction,
  itemTrackingFunction,
  LinkComponent,
  singleCta = {},
  animateNavbar,
  partnerLogoMobile,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const toggleHamburger = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  const handleHamburgerKeyPress = (event) => {
    if (isEnterKeyPress(event)) {
      toggleHamburger()
    }
  }
  const MobileNavClasses = [styles.mobileNavbar]
  if (showMobileMenu) {
    MobileNavClasses.push(styles.visible)
  }
  if (extraClass) {
    MobileNavClasses.push(extraClass)
  }
  if (singleCta.href) {
    MobileNavClasses.push(styles.singleCta)
  }

  if (animateNavbar) {
    MobileNavClasses.push(styles.mobileNavbarAnimation)
  }

  if (partnerLogoMobile) {
    MobileNavClasses.push(styles.isPartnerLogo)
  }

  const Hamburger = () => (
    <BaseHamburger
      className={styles.hamburger}
      visibleState={showMobileMenu}
      clickHandler={() => toggleHamburger()}
      keyPressHandler={(e) => handleHamburgerKeyPress(e)}
    />
  )
  // disable scrolling when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [showMobileMenu])

  return (
    <>
      {!partnerLogoMobile && !singleCta.href && <Hamburger />}
      <div className={MobileNavClasses.join(' ')}>
        {!singleCta.href && (
          <div
            className={
              showMobileMenu ? styles.mobileMenu : styles.hideMobileMenu
            }
          >
            <div className={styles.mobileHeader}>
              <NavLink
                className={styles.phoneLogo}
                href={logoHref}
                currentPageAwareness={true}
                currentPageFunction={(e) => toggleHamburger(e)}
                currentPageCondition={showMobileMenu}
                LinkComponent={LinkComponent}
                trackingFunction={itemTrackingFunction}
                itemLabel={'Logo'}
              >
                {LogoGreen({ className: styles.logo })}
              </NavLink>
              <div className={styles.mobileCta}>
                <CtaButton
                  href={singleCta.href ? singleCta.href : links.CTA.href}
                  trackingFunction={ctaButtonTrackingFunction}
                  hideOnMobile={hideMobileCta}
                  title={singleCta.title ? singleCta.title : links.CTA.title}
                />
              </div>
              <Hamburger />
            </div>
            <AccordionNav
              extraClass={styles.accordion}
              links={links}
              currentPageFunction={(e) => toggleHamburger(e)}
              navVisible={showMobileMenu}
              LinkComponent={LinkComponent}
              trackingFunction={itemTrackingFunction}
            />
            <SecondaryLinks
              links={secondaryLinksLinks}
              className={styles.secondaryLinks}
              currentPageFunction={(e) => toggleHamburger(e)}
              currentPageCondition={showMobileMenu}
              LinkComponent={LinkComponent}
              trackingFunction={itemTrackingFunction}
            />
          </div>
        )}
        <div className={styles.leftBar}>
          <NavLink
            className={styles.phoneLogoFancy}
            href={singleCta.href ? singleCta.href : logoHref}
            currentPageAwareness={true}
            currentPageFunction={(e) => toggleHamburger(e)}
            currentPageCondition={showMobileMenu}
            LinkComponent={LinkComponent}
            trackingFunction={itemTrackingFunction}
            itemLabel={'Logo'}
          >
            <FancyAnimatedLogo />
          </NavLink>
          {partnerLogoMobile && (
            <>
              <div className={styles.plus}>
                <img
                  src="https://res.cloudinary.com/getethos/image/upload/v1691063818/pluss_aizsda.svg"
                  title="Plus"
                  alt="Plus"
                />
              </div>
              <div className={styles.partnerLogo}>{partnerLogoMobile}</div>
            </>
          )}
        </div>
        {!partnerLogoMobile && (
          <CtaButton
            buttonStyle={ctaButtonStyle}
            href={singleCta.href ? singleCta.href : links.CTA.href}
            trackingFunction={ctaButtonTrackingFunction}
            hideOnMobile={hideMobileCta}
            title={singleCta.title ? singleCta.title : links.CTA.title}
          />
        )}
      </div>
    </>
  )
}

MobileNav.propTypes = {
  ctaButtonStyle: PropTypes.oneOf(['Black', 'BlackOutline']),
  links: PropTypes.object.isRequired,
  extraClass: PropTypes.string,
  ctaButtonTrackingFunction: PropTypes.func,
  itemTrackingFunction: PropTypes.func,
  LinkComponent: PropTypes.object,
  logoHref: PropTypes.string.isRequired,
  secondaryLinksLinks: PropTypes.array.isRequired,
  hideMobileCta: PropTypes.bool,
  singleCta: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
  }),
  animateNavbar: PropTypes.bool,
  partnerLogoMobile: PropTypes.node,
}

export default MobileNav
