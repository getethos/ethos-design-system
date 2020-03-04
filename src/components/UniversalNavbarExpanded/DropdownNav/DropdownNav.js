import React from 'react'
import PropTypes from 'prop-types'

// Reused assets from UniversalNavbar
import { DropdownParentIcon } from '../../UniversalNavbar/assets/icons.js'

// EDS core components
import { Footnote } from '../../index'

// Sibling components
import DropdownChildren from './DropdownChildren'

// Styles
import styles from './DropdownNav.module.scss'

/**
 * Dropdown (on hover) navigation menu for desktop/laptop viewports
 *
 * @param {object} links - URLs and text
 * @param {object} LinkComponent - Agnotistic Reach and React Router Link (ex. Gatsby's <Link>)
 *
 * @return {JSX.Element}
 */

const DropdownNav = ({ links, LinkComponent }) => {
  return (
    <div className={styles.dropdownNav}>
      {links.NAVLINKS.map((link) => (
        <div className={styles.dropdownNavParent} key={link.id}>
          <Footnote.Regular400>
            {link.title}
            <span className={styles.dropdownNavParentIcon}>
              <DropdownParentIcon />
            </span>
          </Footnote.Regular400>
          <DropdownChildren
            child={link}
            LinkComponent={LinkComponent}
            extraClass={styles.dropdownNavChildren}
          />
        </div>
      ))}
    </div>
  )
}

DropdownNav.propTypes = {
  links: PropTypes.object.isRequired,
  LinkComponent: PropTypes.object,
}

export default DropdownNav
