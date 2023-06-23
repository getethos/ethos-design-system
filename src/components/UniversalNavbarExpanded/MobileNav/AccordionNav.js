import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

// Reused assets from UniversalNavbar
import { AccordionToggleIcon } from '../../UniversalNavbar/assets/icons.js'

// EDS core components
import { Body2, TitleMedium } from '../../index'

// Parent component (UniversalNavbar) siblings
import NavLink from '../NavLink'

//Helpers
import { isEnterKeyPress } from '../../../helpers/isEnterKeyPress'

// Styles
import styles from './AccordionNav.module.scss'
import { NestedLinks } from './NestedLinks/NestedLinks.js'

/**
 * Interactive accordion menu, displays at top of Mobile Nav.
 *
 * TODO replace with fresh EDS Accordion component if compatible
 *
 * @param {string} extraClass - Extra top level class
 * @param {object} links - URLs and text
 * @param {boolean} navVisible - Condition to check before executing currentPageFunction
 * @param {function} currentPageFunction - Function to execute when navigating to link of present page
 * @param {function} trackingFunction - Analytics tracking function
 * @param {object} LinkComponent - Agnotistic Reach and React Router Link (ex. Gatsby's <Link>)
 *
 * @return {JSX.Element}
 */
const AccordionNav = ({
  extraClass,
  links,
  navVisible,
  currentPageFunction,
  trackingFunction,
  LinkComponent,
}) => {
  const [activeAccordionItem, setActiveAccordionItem] = useState(false)

  useEffect(() => {
    if (!navVisible) {
      setActiveAccordionItem(false)
    }
  })

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
            <TitleMedium.Sans.Regular400 elementClasses={styles.linkText}>
              {link.title}
            </TitleMedium.Sans.Regular400>
            <AccordionToggleIcon />
          </div>
          <div className={styles.accordionChildren}>
            {!link.hasExpandedNav && (
              <div
                key={get(link, 'subnav.cta.id')}
                className={styles.accordionChild}
              >
                <Body2.Regular400>
                  <NavLink
                    href={get(link, 'subnav.cta.href')}
                    currentPageAwareness={true}
                    className={styles.innerLink}
                    currentPageFunction={(e) => currentPageFunction(e)}
                    currentPageCondition={navVisible}
                    LinkComponent={LinkComponent}
                    trackingFunction={trackingFunction}
                    itemLabel={link.subnav.cta.title}
                  >
                    {get(link, 'subnav.cta.title')}
                  </NavLink>
                </Body2.Regular400>
              </div>
            )}
            {link.hasExpandedNav ? (
              <NestedLinks
                isNavVisible={navVisible}
                trackingFunction={trackingFunction}
                link={link}
              />
            ) : (
              get(link, 'subnav.items').map((link) => (
                <div key={link.id} className={styles.accordionChild}>
                  <Body2.Regular400>
                    <NavLink
                      href={link.href}
                      className={styles.innerLink}
                      currentPageAwareness={true}
                      currentPageFunction={(e) => currentPageFunction(e)}
                      currentPageCondition={navVisible}
                      LinkComponent={LinkComponent}
                      trackingFunction={trackingFunction}
                      itemLabel={link.title}
                    >
                      {link.title}
                    </NavLink>
                  </Body2.Regular400>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

AccordionNav.propTypes = {
  extraClass: PropTypes.string,
  links: PropTypes.object.isRequired,
  navVisible: PropTypes.bool,
  currentPageFunction: PropTypes.func,
  ctaButtonTrackingFunction: PropTypes.func,
  trackingFunction: PropTypes.func,
  LinkComponent: PropTypes.object,
}

export default AccordionNav
