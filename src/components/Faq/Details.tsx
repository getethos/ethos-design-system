import * as React from 'react'
import { Body } from '../index'
import styles from './Faq.module.scss'
type DetailsProps = {
  summary: string
  open?: boolean
}
export const Details: React.SFC<DetailsProps> = ({
  children,
  summary,
  open = false,
}) => {
  const carrotSvg = (
    <svg viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.999999 8.375L9.375 16.75L17.75 8.375"
        stroke="black"
        strokeOpacity="0.85"
        strokeWidth="1.5"
      />
    </svg>
  )
  return (
    <details open={open}>
      <summary>
        <div className={styles.summary}>
          <Body.Medium500>{summary}</Body.Medium500>
          <div className={styles.carrot}>{carrotSvg}</div>
        </div>
      </summary>
      <div className={styles.body}>
        <Body.Regular400>{children}</Body.Regular400>
      </div>
    </details>
  )
}
