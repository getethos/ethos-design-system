import React from 'react'
import PropTypes from 'prop-types'

import { TitleMedium } from '../../index'
import NavLink from '../NavLink'
import styles from './BelowAccordion.module.scss'

const BelowAccordion = ({
  links,
  className,
  samePageCondition,
  samePageFunction,
  LinkComponent,
}) => {
  const classes = [styles.belowAccordion]
  if (className) {
    classes.push(className)
  }
  return (
    <div className={classes.join(' ')}>
      {links.map((link, index) => (
        <div
          className={styles.belowAccordionItem}
          key={`belowAccordion${index}`}
        >
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

BelowAccordion.propTypes = {
  links: PropTypes.array.isRequired,
  className: PropTypes.string,
  samePageCondition: PropTypes.bool,
  samePageFunction: PropTypes.func,
  LinkComponent: PropTypes.object,
}

export default BelowAccordion
