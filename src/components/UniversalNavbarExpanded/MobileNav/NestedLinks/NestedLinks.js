import styles from './NestedLinks.module.scss'
import React, { useEffect, useState } from 'react'
import { isEnterKeyPress } from '../../../../helpers/isEnterKeyPress'
import { TitleMedium } from '../../../Type/TitleMedium'
import { AccordionToggleIcon } from '../../../UniversalNavbar/assets/icons'
import { Banner } from '../../DropdownNav/NestedCategories/Banner'
import PropTypes from 'prop-types'
import NavLink from '../../NavLink'

export const NestedLinks = ({ link, trackingFunction, isNavVisible }) => {
  const [activeAccordionItem, setActiveAccordionItem] = useState(false)

  useEffect(() => {
    if (!isNavVisible) {
      setActiveAccordionItem(false)
    }
  }, [isNavVisible])

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

  const subnav = link.subnav

  return (
    <div>
      <Banner cta={subnav.cta} trackingFunction={trackingFunction} />
      {subnav.items.map((subNavItem, idx) => (
        <div
          className={idx === activeAccordionItem ? styles.active : ''}
          key={`${subNavItem.id}_${subNavItem.category}`}
        >
          <div
            onClick={() => toggleAccordionItem(idx)}
            onKeyPress={(e) => handleAccordionItemKeyPress(e, idx)}
            tabIndex={0}
            className={styles.nestedCategoryParent}
            role="button"
          >
            <TitleMedium.Serif.Book500 elementClasses={styles.categoryText}>
              {subNavItem.category}
            </TitleMedium.Serif.Book500>
            <AccordionToggleIcon />
          </div>
          {subNavItem.items.map((subItem) => (
            <div
              key={`${subItem.id}_${subItem.title}`}
              className={styles.nestedCategoryChild}
            >
              <NavLink
                trackingFunction={trackingFunction}
                itemLabel={subItem.title}
                href={subItem.href}
              >
                <TitleMedium.Sans.Regular400 elementClasses={styles.linkText}>
                  {subItem.title}
                </TitleMedium.Sans.Regular400>
              </NavLink>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

NestedLinks.propTypes = {
  link: PropTypes.shape({
    subnav: PropTypes.shape({
      cta: PropTypes.shape({
        href: PropTypes.string,
        title: PropTypes.string,
        id: PropTypes.string,
      }),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          category: PropTypes.string,
          items: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string,
              href: PropTypes.string,
              id: PropTypes.string,
            })
          ),
        })
      ),
    }),
  }),
  trackingFunction: PropTypes.func,
  isNavVisible: PropTypes.bool,
}
