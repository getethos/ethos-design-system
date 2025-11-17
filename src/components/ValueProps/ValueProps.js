import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { TitleSmall, Body, CloudinaryImage } from '../index'

import styles from './ValueProps.module.scss'

export function ValueProps({ sections = defaultSections }) {
  return (
    <div className={`${styles.container} ${styles.root}`}>
      {sections.map((section) => (
        <div className={styles.section} key={uuidv4()}>
          <div>
            <CloudinaryImage
              publicId={section.iconUrl}
              alt={section.alt}
              width={[56, 56, 56, 56]}
              height={[56, 56, 56, 56]}
            />
          </div>
          <div className={styles.text}>
            <TitleSmall.Sans.Regular400>
              {section.header}
            </TitleSmall.Sans.Regular400>
            <Body.Regular400>{section.subHeader}</Body.Regular400>
          </div>
        </div>
      ))}
    </div>
  )
}

const defaultSections = [
  {
    iconUrl:
      'https://res.cloudinary.com/getethos/image/upload/v1566238234/02_Icons/icon_hourglass_xedxvp.svg',
    header: 'Fast, easy, free application',
    subHeader:
      'Our online application is straightforward and can be completed in minutes.',
    alt: 'Hourglas Icon',
  },
  {
    iconUrl:
      'https://res.cloudinary.com/getethos/image/upload/v1566238232/02_Icons/icon_half-dollar_wsrssk.svg',
    header: 'No cancellation fees',
    subHeader:
      "You can cancel your policy anytime, with no extra fees. If you change your mind within the first 30 days, we'll refund your payment in full.",
  },
  {
    iconUrl:
      'https://res.cloudinary.com/getethos/image/upload/v1566238234/02_Icons/icon_heart-shield_sh7goi.svg',
    header: 'Trusted Partners',
    subHeader:
      'We partner with Legal & General America, RGAX, and Munich Re to provide you affordable coverage.',
    alt: 'Hear Shield Icon',
  },
]

ValueProps.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      iconUrl: PropTypes.string.isRequired,
      header: PropTypes.oneOf([PropTypes.string, PropTypes.element]).isRequired,
      subHeader: PropTypes.oneOf([PropTypes.string, PropTypes.element])
        .isRequired,
      alt: PropTypes.string,
    })
  ),
}

export default ValueProps
