import React from 'react'
// EDS core components
import { Footnote } from '../../index'
import { Links } from '../../types'
// Reused assets from UniversalNavbar
import { ParentIcon } from '../../UniversalNavbar/assets/icons'
// Sibling components
import DropdownChildren from './DropdownChildren'
// Styles
import styles from './DropdownNav.module.scss'
type DropdownNavProps = {
  links: Links
  LinkComponent?: React.ElementType
}
const DropdownNav: React.SFC<DropdownNavProps> = ({ links, LinkComponent }) => {
  return (
    <div className={styles.dropdownNav}>
      {links.NAVLINKS?.map((link) => (
        <div className={styles.dropdownNavParent} key={link.id}>
          <Footnote.Regular400>
            {link.title}
            <span className={styles.parentIcon}>
              <ParentIcon />
            </span>
          </Footnote.Regular400>
          <DropdownChildren
            child={link}
            LinkComponent={LinkComponent}
            containerClasses={styles.children}
          />
        </div>
      ))}
    </div>
  )
}
export default DropdownNav
