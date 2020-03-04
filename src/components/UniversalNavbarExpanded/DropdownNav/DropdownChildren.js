import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

// Reused assets from UniversalNavbar
import { DropdownLinkIcon } from '../../UniversalNavbar/assets/icons.js'

// EDS core components
import { Layout, Footnote } from '../../index'

// Parent component (UniversalNavbar) siblings
import NavLink from '../NavLink'

// DropdownChildren sibling components
import DropdownCta from './DropdownCta'

// Helpers
import { removeLastWord, getLastWord } from '../../../helpers/splitLastWord'

// Styles
import styles from './DropdownChildren.module.scss'

/**
 * Content (links) displayed in the dropdown menu after hovering the parent element
 *
 * @param {string} extraClass - Extra top level class
 * @param {object} child - CTA copy, url and link items with titles/urls
 * @param {object} LinkComponent - Agnotistic Reach and React Router Link (ex. Gatsby's <Link>)
 *
 * @return {JSX.Element}
 */
const DropdownChildren = ({ extraClass, child, LinkComponent }) => {
  // ------------------------------------------------
  // Split the links for the subnav into two columns.
  // Related to the way design wanted spacing to work.
  // Helps account for items of variable text length.
  // The order of the links should be:
  // 1 || 2
  // 3 || 4
  // 5 || 6
  const columns = [[], []]
  const childItems = get(child, 'subnav.items')
  childItems.map((childItem, i) => {
    columns[i % 2 === 0 ? 0 : 1].push(childItems[i])
  })
  // ------------------------------------------------

  const classes = [styles.dropdownNavChildren]
  if (extraClass) {
    classes.push(extraClass)
  }

  return (
    <div className={classes.join(' ')}>
      <Layout.HorizontallyPaddedContainer>
        <div className={styles.dropdownNavChildrenInner}>
          <div className={styles.dropdownNavChildrenCta}>
            {child.subnav &&
              get(child, 'subnav.cta') &&
              get(child, 'subnav.cta.href') && (
                <NavLink
                  href={get(child, 'subnav.cta.href')}
                  LinkComponent={LinkComponent}
                >
                  <DropdownCta
                    title={get(child, 'subnav.cta.title')}
                    subcopy={get(child, 'subnav.cta.subcopy')}
                  />
                </NavLink>
              )}
          </div>
          <div className={styles.dropdownNavChildrenItems}>
            {columns.map((column, idx) => (
              <div
                className={styles.dropdownNavChildrenColumn}
                key={`navChildColumn${idx}`}
              >
                {column.map((link) => (
                  <div className={styles.dropdownNavChild} key={link.id}>
                    <Footnote.Regular400>
                      <NavLink href={link.href} LinkComponent={LinkComponent}>
                        <div className={styles.dropdownNavChildLink}>
                          <span>{removeLastWord(link.title)}</span>
                          <div className={styles.dropdownNavChildTextIcon}>
                            <span>{getLastWord(link.title)}</span>
                            <DropdownLinkIcon />
                          </div>
                        </div>
                      </NavLink>
                    </Footnote.Regular400>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Layout.HorizontallyPaddedContainer>
    </div>
  )
}

DropdownChildren.propTypes = {
  extraClass: PropTypes.string,
  child: PropTypes.object,
  LinkComponent: PropTypes.object,
}

export default DropdownChildren
