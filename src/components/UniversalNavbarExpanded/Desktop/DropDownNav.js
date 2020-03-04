import React from 'react'
import PropTypes from 'prop-types'

import { DropdownParentIcon } from '../../UniversalNavbar/assets/icons.js'
import { Footnote } from '../../index'
import DropDownChildren from './DropDownChildren'
import styles from './DropDownNav.module.scss'

const DropDownNav = ({ links, LinkComponent }) => {
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
          <DropDownChildren
            child={link}
            LinkComponent={LinkComponent}
            extraClass={styles.dropdownNavChildren}
          />
        </div>
      ))}
    </div>
  )
}

DropDownNav.propTypes = {
  links: PropTypes.object.isRequired,
  LinkComponent: PropTypes.object,
}

export default DropDownNav
