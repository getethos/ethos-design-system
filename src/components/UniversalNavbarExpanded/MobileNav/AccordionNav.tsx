import get from 'lodash/get'
import * as React from 'react'
import { useEffect, useState } from 'react'
//Helpers
import { isEnterKeyPress } from '../../../helpers/isEnterKeyPress'
// EDS core components
import { TitleMedium, TitleSmall } from '../../index'
import { Links } from '../../types'
// Reused assets from UniversalNavbar
import { AccordionToggleIcon } from '../../UniversalNavbar/assets/icons'
// Parent component (UniversalNavbar) siblings
import NavLink from '../NavLink'
// Styles
import styles from './AccordionNav.module.scss'
type AccordionNavProps = {
  extraClass?: string
  links: Links
  navVisible?: boolean
  currentPageFunction: (...args: any[]) => any
  LinkComponent?: React.ElementType
}
const AccordionNav: React.FC<AccordionNavProps> = ({
  extraClass,
  links,
  navVisible,
  currentPageFunction,
  LinkComponent,
}) => {
  const [activeAccordionItem, setActiveAccordionItem] = useState<
    number | null | undefined
  >()
  useEffect(() => {
    if (!navVisible) {
      setActiveAccordionItem(null)
    }
  })
  const toggleAccordionItem = (toggledItem: number) => {
    setActiveAccordionItem(
      activeAccordionItem === toggledItem ? null : toggledItem
    )
  }
  const handleAccordionItemKeyPress = (event, index: number) => {
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
      {links.NAVLINKS?.map((link, idx) => (
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
                  currentPageAwareness={true}
                  currentPageFunction={(e) => currentPageFunction(e)}
                  currentPageCondition={navVisible}
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
                    currentPageAwareness={true}
                    currentPageFunction={(e) => currentPageFunction(e)}
                    currentPageCondition={navVisible}
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
export default AccordionNav
