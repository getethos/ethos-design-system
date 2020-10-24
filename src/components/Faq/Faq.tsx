import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TitleLarge, TitleMedium } from '../index'
import { Details } from './Details'
import styles from './Faq.module.scss'
type FaqProps = {
  questions?: {
    summary: string
    content: string | JSX.Element
  }[]
  open?: boolean
}
export const Faq: React.SFC<FaqProps> = ({ questions = [], open = true }) => {
  return (
    <div className={styles.root}>
      <div className={styles.leftColumn}>
        <TitleMedium.Serif.Book500>FAQs</TitleMedium.Serif.Book500>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.phoneTitle}>
          <TitleLarge.Serif.Book500>FAQs</TitleLarge.Serif.Book500>
        </div>
        {questions.map(({ summary, content }, index) => {
          const startOpen = open && index === 0
          return (
            <Details summary={summary} open={startOpen} key={uuidv4()}>
              {content}
            </Details>
          )
        })}
      </div>
    </div>
  )
}
export default Faq
