import * as React from 'react'
// EDS core components
import { Caption2, Layout } from '../index'
import { LinkItem, Links } from '../types'
// Reused assets from UniversalNavbar
import LogoNotAnimated from '../UniversalNavbar/assets/ethos-logo-black'
import { AccountIcon, SearchIcon } from '../UniversalNavbar/assets/icons'
// UniversalNavbarExpanded simple siblings
import CtaButton from './CtaButton'
// UniversalNavbarExpanded complex siblings
import DropdownNav from './DropdownNav/DropdownNav'
import MobileNav from './MobileNav/MobileNav'
import NavLink from './NavLink'
// Styles
import styles from './UniversalNavbarExpanded.module.scss'
type UniversalNavbarExpandedProps = {
  hideMobileCta?: boolean
  hideDesktopCta?: boolean
  trackCtaClick: (...args: any[]) => any
  LinkComponent?: React.ElementType
  logoHref: string
  links: Links
  estimateExperiment?: boolean
}
const UniversalNavbarExpanded: React.FC<UniversalNavbarExpandedProps> = ({
  LinkComponent,
  hideMobileCta,
  hideDesktopCta,
  logoHref,
  trackCtaClick,
  links,
  estimateExperiment,
}) => {
  const BELOW_ACCORDION_LINKS = [links.CTA, links.ACCOUNT, links.SEARCH].filter(
    Boolean
  ) as LinkItem[]
  const SearchIconLink = () => (
    <NavLink className={styles.searchIcon} href={links.SEARCH?.href || ''}>
      <SearchIcon />
    </NavLink>
  )
  const AccountIconLink = () => (
    <NavLink className={styles.accountIcon} href={links.ACCOUNT?.href || ''}>
      <AccountIcon />
    </NavLink>
  )
  const ExperimentCopy = () => (
    <div
      className={styles.estimateCopyOptimizely}
      data-optimizely="estimateNavBarCopyOptimizely"
    >
      <div className={styles.estimateCopy}>
        <Caption2.Regular400>Want to know your real rate?</Caption2.Regular400>
      </div>
    </div>
  )
  const layoutClasses = [styles.flex, styles.itemsCenter]
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <Layout.ScrollDetector>
          <MobileNav
            extraClass={'isFixedCta'}
            logoHref={logoHref}
            links={links}
            secondaryLinksLinks={BELOW_ACCORDION_LINKS}
            hideMobileCta={hideMobileCta}
            ctaButtonTrackingFunction={trackCtaClick}
            LinkComponent={LinkComponent}
          />
          <div className={styles.laptopAndUp}>
            <div className={styles.laptopAndUpContainer}>
              <div className={layoutClasses.join(' ')}>
                <NavLink href={logoHref} LinkComponent={LinkComponent}>
                  {LogoNotAnimated({ className: styles.logo })}
                </NavLink>
                <DropdownNav links={links} LinkComponent={LinkComponent} />
              </div>
              <div className={layoutClasses.join(' ')}>
                {estimateExperiment && <ExperimentCopy />}
                <SearchIconLink />
                <AccountIconLink />
                <div className={styles.cta}>
                  {!hideDesktopCta && (
                    <CtaButton
                      href={links.CTA?.href || ''}
                      trackingFunction={trackCtaClick}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Layout.ScrollDetector>
      </div>
    </div>
  )
}
UniversalNavbarExpanded.defaultProps = {
  hideMobileCta: false,
  hideDesktopCta: false,
  logoHref: '/',
  trackCtaClick: () => {},
  links: {},
  estimateExperiment: false,
}
export { UniversalNavbarExpanded }
