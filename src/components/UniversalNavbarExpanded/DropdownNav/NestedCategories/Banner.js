import React from 'react'
import PropTypes from 'prop-types'
import { Button, TitleSmall2, TitleMedium2 } from '../../../index'
import styles from './Banner.module.scss'

export const Banner = ({ cta }) => {
  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.bannerInner}>
        <div className={styles.categoryTextWrapper}>
          <TitleSmall2.Serif.Book500>{cta?.title}</TitleSmall2.Serif.Book500>
          <div className={styles.categoryDivider} />
          <div>
            <TitleMedium2.Sans.Regular400 elementClasses={styles.bannerSubText}>
              {cta?.subcopy}
            </TitleMedium2.Sans.Regular400>
          </div>
        </div>
        <div className={styles.bannerButton}>
          <Button.Small.BlackOutline>Learn more</Button.Small.BlackOutline>
        </div>
      </div>
    </div>
  )
}

Banner.propTypes = {
  cta: PropTypes.shape({
    title: PropTypes.string,
    subcopy: PropTypes.string,
  }),
}
