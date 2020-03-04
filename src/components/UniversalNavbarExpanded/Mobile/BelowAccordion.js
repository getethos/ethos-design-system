import React from 'react'
import { TitleMedium } from '../../index'
import NavLink from '../NavLink'
import styles from './BelowAccordion.module.scss'

const BelowAccordion = ({
  links,
  className,
  LinkComponent,
  samePageCondition,
  samePageFunction,
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

export default BelowAccordion
