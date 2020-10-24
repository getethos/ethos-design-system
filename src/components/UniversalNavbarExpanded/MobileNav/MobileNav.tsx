import * as React from 'react'
import { useState } from 'react'
// Helpers
import { isEnterKeyPress } from '../../../helpers/isEnterKeyPress'
import { LinkItem, Links } from '../../types'
import LogoWhite from '../../UniversalNavbar/assets/ethos-logo-white.js'
// Reused assets from UniversalNavbar
import FancyAnimatedLogo from '../../UniversalNavbar/FancyAnimatedLogo'
// Parent component (UniversalNavbar) siblings
import CtaButton from '../CtaButton'
import NavLink from '../NavLink'
// MobileNav siblings
import AccordionNav from './AccordionNav'
import { BaseHamburger } from './BaseHamburger'
// Styles
import styles from './MobileNav.module.scss'
import SecondaryLinks from './SecondaryLinks'
type MobileNavProps = {
  links: Links
  extraClass?: string
  ctaButtonTrackingFunction?: (...args: any[]) => any | void
  LinkComponent?: React.ElementType
  logoHref: string
  secondaryLinksLinks: LinkItem[]
  hideMobileCta?: boolean
}
const MobileNav: React.FC<MobileNavProps> = ({
  extraClass,
  logoHref,
  links,
  secondaryLinksLinks,
  hideMobileCta,
  ctaButtonTrackingFunction,
  LinkComponent,
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
            currentPageAwareness={true}
            currentPageFunction={toggleHamburger}
            currentPageCondition={showMobileMenu}
            LinkComponent={LinkComponent}
          >
            {LogoWhite({ className: styles.logo })}
          </NavLink>
          <Hamburger />
          <AccordionNav
            extraClass={styles.accordion}
            links={links}
            currentPageFunction={toggleHamburger}
            navVisible={showMobileMenu}
            LinkComponent={LinkComponent}
          />
          <SecondaryLinks
            links={secondaryLinksLinks}
            className={styles.secondaryLinks}
            currentPageFunction={toggleHamburger}
            currentPageCondition={showMobileMenu}
            LinkComponent={LinkComponent}
          />
        </div>
        <NavLink
          className={styles.phoneLogoFancy}
          href={logoHref}
          currentPageAwareness={true}
          currentPageFunction={toggleHamburger}
          currentPageCondition={showMobileMenu}
          LinkComponent={LinkComponent}
        >
          <FancyAnimatedLogo />
        </NavLink>
        <CtaButton
          href={links.CTA?.href || ''}
          trackingFunction={ctaButtonTrackingFunction}
          hideOnMobile={hideMobileCta}
        />
      </div>
    </>
  )
}
export default MobileNav
