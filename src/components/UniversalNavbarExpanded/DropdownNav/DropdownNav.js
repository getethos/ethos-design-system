import React from 'react'
import PropTypes from 'prop-types'

import { DropdownParentIcon } from '../../UniversalNavbar/assets/icons.js'
import { Footnote } from '../../index'
import DropdownChildren from './DropdownChildren'
import styles from './DropdownNav.module.scss'

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
