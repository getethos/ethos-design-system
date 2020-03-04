import React, { useState } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import { TitleMedium, TitleSmall } from '../../index'
import { AccordionToggleIcon } from '../../UniversalNavbar/assets/icons.js'
import { isEnterKeyPress } from '../../../helpers/isEnterKeyPress'
import NavLink from '../NavLink'
import styles from './AccordionNav.module.scss'

const AccordionNav = ({
  extraClass,
  links,
  samePageCondition,
  samePageFunction,
  LinkComponent,
}) => {
  const [activeAccordionItem, setActiveAccordionItem] = useState(false)

  const toggleAccordionItem = (toggledItem) => {
    setActiveAccordionItem(
      activeAccordionItem === toggledItem ? false : toggledItem
    )
  }

  const handleAccordionItemKeyPress = (event, index) => {
    if (isEnterKeyPress(event)) {
      toggleAccordionItem(index)
    }
  }

  const classes = [styles.accordion]
  if (extraClass) {
    classes.push(extraClass)
  }

  return (
    <div className={classes.join(' ')}>
      {links.NAVLINKS.map((link, idx) => (
        <div
          key={link.id}
          className={
            idx === activeAccordionItem
              ? [styles.accordionItem, styles.active].join(' ')
              : styles.accordionItem
          }
        >
          <div
            className={styles.accordionParent}
            onClick={() => toggleAccordionItem(idx)}
            onKeyPress={(e) => handleAccordionItemKeyPress(e, idx)}
            tabIndex={0}
            role="button"
          >
            <TitleMedium.Sans.Regular400>
              {link.title}
            </TitleMedium.Sans.Regular400>
            <AccordionToggleIcon />
          </div>
          <div className={styles.accordionChildren}>
            <div
              key={get(link, 'subnav.cta.id')}
              className={styles.accordionChild}
            >
              <TitleSmall.Sans.Light300>
                <NavLink
                  href={get(link, 'subnav.cta.href')}
                  samePageAwareness={true}
                  samePageFunction={(e) => samePageFunction(e)}
                  samePageCondition={samePageCondition}
                  LinkComponent={LinkComponent}
                >
                  {get(link, 'subnav.cta.title')}
                </NavLink>
              </TitleSmall.Sans.Light300>
            </div>
            {get(link, 'subnav.items').map((link) => (
              <div key={link.id} className={styles.accordionChild}>
                <TitleSmall.Sans.Light300>
                  <NavLink
                    href={link.href}
                    samePageAwareness={true}
                    samePageFunction={(e) => samePageFunction(e)}
                    samePageCondition={samePageCondition}
                    LinkComponent={LinkComponent}
                  >
                    {link.title}
                  </NavLink>
                </TitleSmall.Sans.Light300>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

AccordionNav.propTypes = {
  links: PropTypes.object.isRequired,
  extraClass: PropTypes.string,
  samePageCondition: PropTypes.bool,
  samePageFunction: PropTypes.func,
  LinkComponent: PropTypes.object,
}

export default AccordionNav
