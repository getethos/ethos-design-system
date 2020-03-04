import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import { DropdownLinkIcon } from '../../UniversalNavbar/assets/icons.js'
import { Layout, Footnote } from '../../index'
import DropdownCta from './DropdownCta'
import NavLink from '../NavLink'
import { removeLastWord, getLastWord } from '../../../helpers/splitLastWord'
import styles from './DropdownChildren.module.scss'

const DropdownChildren = ({ extraClass, child, LinkComponent }) => {
  const columns = [[], []]
  const childItems = get(child, 'subnav.items')

  for (var i = 0; i < childItems.length; i++) {
    if (i % 2 === 0) {
      columns[0].push(childItems[i])
    } else {
      columns[1].push(childItems[i])
    }
  }

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
  child: PropTypes.object,
  extraClass: PropTypes.string,
  LinkComponent: PropTypes.object,
}

export default DropdownChildren
