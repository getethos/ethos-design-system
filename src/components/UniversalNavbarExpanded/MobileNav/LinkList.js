import React from 'react'
import PropTypes from 'prop-types'

// EDS core components
import { TitleMedium } from '../../index'

// Parent component (UniversalNavbar) siblings
import NavLink from '../NavLink'

// Styles
import styles from './LinkList.module.scss'

/**
 * Static link list displayed below the accordion in MobileNav
 *
 * @param {array} links - URLs and text
 * @param {string} className - Extra top level class
 * @param {boolean} samePageCondition - Condition to check before executing samePageFunction
 * @param {function} samePageFunction - Function to execute when navigating to link of present page
 * @param {object} LinkComponent - Agnotistic Reach and React Router Link (ex. Gatsby's <Link>)
 *
 * @return {JSX.Element}
 */
const LinkList = ({
  links,
  className,
  samePageCondition,
  samePageFunction,
  LinkComponent,
}) => {
  const classes = [styles.linkList]
  if (className) {
    classes.push(className)
  }
  return (
    <div className={classes.join(' ')}>
      {links.map((link, index) => (
        <div className={styles.linkListItem} key={`linkList${index}`}>
          <NavLink
            href={link.href}
            samePageFunction={(e) => samePageFunction(e)}
            samePageCondition={samePageCondition}
            samePageAwareness={true}
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

LinkList.propTypes = {
  links: PropTypes.array.isRequired,
  className: PropTypes.string,
  samePageCondition: PropTypes.bool,
  samePageFunction: PropTypes.func,
  LinkComponent: PropTypes.object,
}

export default LinkList
