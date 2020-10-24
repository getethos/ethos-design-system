import * as React from 'react'
// EDS core components
import { TitleMedium } from '../../index'
import { LinkItem } from '../../types'
// Parent component (UniversalNavbar) siblings
import NavLink from '../NavLink'
// Styles
import styles from './SecondaryLinks.module.scss'
type SecondaryLinksProps = {
  links: LinkItem[]
  className?: string
  currentPageCondition?: boolean
  currentPageFunction: (...args: any[]) => any
  LinkComponent?: React.ElementType
}
const SecondaryLinks: React.FC<SecondaryLinksProps> = ({
  links,
  className,
  currentPageCondition,
  currentPageFunction,
  LinkComponent,
}) => {
  const classes = [styles.secondaryLinks]
  if (className) {
    classes.push(className)
  }
  return (
    <div className={classes.join(' ')}>
      {links.map((link, index) => (
        <div
          className={styles.secondaryLinksItem}
          key={`secondaryLinks${index}`}
          data-optimizely={`estimateNavBarCopyMobileOptimizely${index}`}
        >
          <NavLink
            href={link.href || ''}
            currentPageFunction={(e) => currentPageFunction(e)}
            currentPageCondition={currentPageCondition}
            currentPageAwareness={true}
            LinkComponent={LinkComponent}
          >
            <TitleMedium.Sans.Regular400>
              {link.title}
            </TitleMedium.Sans.Regular400>
          </NavLink>
        </div>
      ))}
    </div>
  )
}
export default SecondaryLinks
