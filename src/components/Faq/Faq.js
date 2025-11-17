import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { TitleLarge, TitleMedium, Body } from '../index'

import styles from './Faq.module.scss'

export const Faq = ({ questions = [], open = true }) => {
  return (
    <div className={styles.root}>
      <div className={styles.leftColumn}>
        <TitleMedium.Serif.Book500>FAQs</TitleMedium.Serif.Book500>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.phoneTitle}>
          <TitleLarge.Serif.Book500>FAQs</TitleLarge.Serif.Book500>
        </div>
        {questions.map((q, index) => {
          const startOpen = open && index === 0
          return (
            <Details summary={q.summary} open={startOpen} key={uuidv4()}>
              {q.content}
            </Details>
          )
        })}
      </div>
    </div>
  )
}

Faq.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      summary: PropTypes.string,
      content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
  ),
  /** Set to false for all questions to start collapsed. */
  open: PropTypes.bool,
}

const Details = ({ children, summary, open = false }) => {
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

Details.propTypes = {
  children: PropTypes.node.isRequired,
  summary: PropTypes.string.isRequired,
  open: PropTypes.bool,
}

export default Faq
