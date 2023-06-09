import React from 'react'
import propTypes from 'prop-types'
import { Body2 } from '../../../Body2'
import styles from './CategoryLinks.module.scss'
import NavLink from '../../NavLink'

export const CategoryLinks = ({ links, trackingFunction }) => {
  return (
    <div className={styles.linksWrapper}>
      {links.map((link) => (
        <div className={styles.categoryLink} key={link.id}>
          <NavLink
            itemLabel={link.title}
            href={link.href}
            trackingFunction={trackingFunction}
          >
            <Body2.Regular400>{link.title}</Body2.Regular400>
          </NavLink>
        </div>
      ))}
    </div>
  )
}

CategoryLinks.propTypes = {
  links: propTypes.array,
  trackingFunction: propTypes.func,
}
