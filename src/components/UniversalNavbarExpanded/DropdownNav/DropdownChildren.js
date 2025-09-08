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
import { NestedCategories } from './NestedCategories/NestedCategories.js'

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
  const childItems = get(child, 'subnav.items', [])
  const hasNestedCategories = child.hasExpandedNav

  // Split items into two columns - first column gets more items for odd numbers
  const halfItemsCount = Math.ceil(childItems.length / 2)
  const columns = [
    childItems.slice(0, halfItemsCount),
    childItems.slice(halfItemsCount),
  ]
  // ------------------------------------------------
  const classes = [styles.children]
  if (containerClasses) {
    classes.push(containerClasses)
  }

  return (
    <div className={classes.join(' ')}>
      {hasNestedCategories ? (
        <NestedCategories trackingFunction={trackingFunction} child={child} />
      ) : (
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
      )}
    </div>
  )
}

DropdownChildren.propTypes = {
  containerClasses: PropTypes.string,
  hasNestedCategories: PropTypes.bool,
  child: PropTypes.object,
  LinkComponent: PropTypes.object,
  trackingFunction: PropTypes.func,
}

export default DropdownChildren
