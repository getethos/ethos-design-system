import React from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import { TitleLarge, TitleMedium, Body } from '../index'

import symbol from '../../svgs/expand-details.svg'
import styles from './Faq.module.scss'

export const Faq = ({ questions, open }) => {
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

Faq.defaultProps = {
  questions: [],
  open: true,
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

const Details = ({ children, summary, open }) => {
  const carrotSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={symbol.viewBox}
      className={styles.carrotSvg}
    >
      <use xlinkHref={`#${symbol.id}`} />
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

Details.defaultProps = {
  open: false,
}

Details.propTypes = {
  children: PropTypes.node.isRequired,
  summary: PropTypes.string.isRequired,
  open: PropTypes.bool,
}

export default Faq
