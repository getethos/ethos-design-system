import React from 'react'
import PropTypes from 'prop-types'
import { Button, TitleSmall2, TitleMedium2 } from '../../../index'
import styles from './Banner.module.scss'
import NavLink from '../../NavLink'

export const Banner = ({ cta, trackingFunction }) => {
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
          <NavLink
            itemLabel={cta.ctaText}
            href={cta.href}
            trackingFunction={trackingFunction}
          >
            <Button.Small.BlackOutline>{cta.ctaText}</Button.Small.BlackOutline>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

Banner.propTypes = {
  cta: PropTypes.shape({
    title: PropTypes.string,
    subcopy: PropTypes.string,
    ctaText: PropTypes.string,
    href: PropTypes.string,
  }),
  trackingFunction: PropTypes.func,
}
