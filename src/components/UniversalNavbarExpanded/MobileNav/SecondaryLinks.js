import React from 'react'
import PropTypes from 'prop-types'

// EDS core components
import { TitleMedium } from '../../index'

// Parent component (UniversalNavbar) siblings
import NavLink from '../NavLink'

// Styles
import styles from './SecondaryLinks.module.scss'

/**
 * Static link list displayed below the accordion in MobileNav
 *
 * @param {array} links - URLs and text
 * @param {string} className - Extra top level class
 * @param {boolean} currentPageCondition - Condition to check before executing currentPageFunction
 * @param {function} currentPageFunction - Function to execute when navigating to link of present page
 * @param {object} LinkComponent - Agnotistic Reach and React Router Link (ex. Gatsby's <Link>)
 *
 * @return {JSX.Element}
 */
const SecondaryLinks = ({
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
        >
          <NavLink
            href={link.href}
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

SecondaryLinks.propTypes = {
  links: PropTypes.array.isRequired,
  className: PropTypes.string,
  currentPageCondition: PropTypes.bool,
  currentPageFunction: PropTypes.func,
  LinkComponent: PropTypes.object,
}

export default SecondaryLinks
