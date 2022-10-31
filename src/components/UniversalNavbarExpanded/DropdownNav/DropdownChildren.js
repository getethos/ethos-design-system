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
import IconIntegratedTitle from './IconIntegratedTitle'

// Styles
import styles from './DropdownChildren.module.scss'

/**
 * Content (links) displayed in the dropdown menu after hovering the parent element
 *
 * @param {string} containerClasses - Extra top level class
 * @param {object} child - CTA copy, url and link items with titles/urls
 * @param {object} LinkComponent - Agnotistic Reach and React Router Link (ex. Gatsby's <Link>)
 * @param {function} trackingFunction - Analytics tracking function
 *
 * @return {JSX.Element}
 */
const DropdownChildren = ({
  containerClasses,
  child,
  LinkComponent,
  trackingFunction,
}) => {
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

  const classes = [styles.children]
  if (containerClasses) {
    classes.push(containerClasses)
  }

  return (
    <div className={classes.join(' ')}>
      <Layout.HorizontallyPaddedContainer>
        <div className={styles.childrenInner}>
          <div className={styles.childrenCta}>
            {child.subnav &&
              get(child, 'subnav.cta') &&
              get(child, 'subnav.cta.href') && (
                <NavLink
                  href={get(child, 'subnav.cta.href')}
                  LinkComponent={LinkComponent}
                  trackingFunction={trackingFunction}
                  itemLabel={child.subnav.cta.title}
                >
                  <DropdownCta
                    title={get(child, 'subnav.cta.title')}
                    subcopy={get(child, 'subnav.cta.subcopy')}
                    alternateIcon={get(
                      child,
                      'subnav.cta.alternateIcon',
                      false
                    )}
                  />
                </NavLink>
              )}
          </div>
          <div className={styles.childrenItems}>
            {columns.map((column, idx) => (
              <div
                className={styles.childrenColumn}
                key={`navChildColumn${idx}`}
              >
                {column.map((link) => (
                  <div className={styles.child} key={link.id}>
                    <Footnote.Regular400>
                      <NavLink
                        href={link.href}
                        LinkComponent={LinkComponent}
                        trackingFunction={trackingFunction}
                        itemLabel={link.title}
                      >
                        <div className={styles.childLink}>
                          <IconIntegratedTitle title={link.title}>
                            <DropdownLinkIcon />
                          </IconIntegratedTitle>
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
  containerClasses: PropTypes.string,
  child: PropTypes.object,
  LinkComponent: PropTypes.object,
  trackingFunction: PropTypes.func,
}

export default DropdownChildren
