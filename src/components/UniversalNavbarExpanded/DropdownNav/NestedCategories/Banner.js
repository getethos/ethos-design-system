import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, TitleSmall2, TitleMedium2 } from '../../../index'
import styles from './Banner.module.scss'
import NavLink from '../../NavLink'

export const Banner = ({ cta, trackingFunction }) => {
  const [ctaWidth, setCtaWidth] = useState(0)

  // this is needed to make banner button the same width as the navbar button
  useEffect(() => {
    const updateCtaWidth = () => {
      const headerCta = document.querySelector('#navbar-cta')
      if (!headerCta) return
      // ensure that they are executed in the next available event loop, allowing the browser to render the element correctly before measuring its width.
      setTimeout(() => {
        const dimensions = headerCta.getBoundingClientRect()
        setCtaWidth(dimensions.width)
      }, 0)
    }

    // Run the initial update
    updateCtaWidth()

    // Add event listener for window resize
    window.addEventListener('resize', updateCtaWidth)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateCtaWidth)
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
