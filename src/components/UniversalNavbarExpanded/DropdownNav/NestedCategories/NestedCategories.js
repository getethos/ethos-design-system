import React from 'react'
import propTypes from 'prop-types'
import { Banner } from './Banner'
import { TitleSmall2 } from '../../../Type2'
import { CategoryLinks } from './CategoryLinks'

import styles from './NestedCategories.module.scss'

export const NestedCategories = ({ child, trackingFunction }) => {
  return (
    <div className={styles.container}>
      <Banner cta={child.subnav.cta} />
      <div className={styles.categoriesWrapper}>
        {child.subnav.items.map((itemCategory) => (
          <div className={styles.category} key={itemCategory.id}>
            <TitleSmall2.Serif.Book500 elementClasses={styles.categoryText}>
              {itemCategory.category}
            </TitleSmall2.Serif.Book500>
            <div className={styles.categoryDivider} />
            <CategoryLinks
              trackingFunction={trackingFunction}
              links={itemCategory.items}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

NestedCategories.propTypes = {
  child: propTypes.object,
  trackingFunction: propTypes.func,
}
