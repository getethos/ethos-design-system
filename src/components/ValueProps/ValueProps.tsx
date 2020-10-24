import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Body } from '../Body'
import { CloudinaryImage } from '../Images/Images'
import { TitleSmall } from '../Type/TitleSmall'
import styles from './ValueProps.module.scss'
type Section = {
  iconUrl: string
  alt?: string
  header: string
  subHeader: string
}
type ValuePropsProps = {
  sections: Section[]
}
export const ValueProps: React.SFC<ValuePropsProps> = ({ sections }) => {
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
const defaultSections: Section[] = [
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
ValueProps.defaultProps = {
  sections: defaultSections,
}
export default ValueProps
