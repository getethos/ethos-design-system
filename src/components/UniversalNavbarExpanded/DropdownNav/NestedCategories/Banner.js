import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, TitleSmall2, TitleMedium2 } from '../../../index'
import styles from './Banner.module.scss'
import NavLink from '../../NavLink'

const observerOptions = {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
}

export const Banner = ({ cta, trackingFunction }) => {
  // this is needed to make banner button the same width as the navbar button
  const [ctaWidth, setCtaWidth] = useState(0)
  useEffect(() => {
    const updateCtaWidth = () => {
      const headerCta = document.querySelector('#navbar-cta')
      if (!headerCta) return

      const dimensions = headerCta.getBoundingClientRect()
      setCtaWidth(dimensions.width)
    }

    updateCtaWidth()

    window.addEventListener('resize', updateCtaWidth)

    const observer = new MutationObserver(updateCtaWidth)
    const targetNode = document.querySelector('#navbar-cta')

    if (targetNode) {
      observer.observe(targetNode, observerOptions)
    }
    return () => {
      window.removeEventListener('resize', updateCtaWidth)
      observer.disconnect()
    }
  }, [])
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
            <div
              className={styles.buttonWrapper}
              style={{ '--cta-width': ctaWidth ? `${ctaWidth}px` : 'auto' }}
            >
              <Button.Small.BlackOutline>
                {cta.ctaText}
              </Button.Small.BlackOutline>
            </div>
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
