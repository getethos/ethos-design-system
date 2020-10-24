import * as React from 'react'
import styles from './Tag.module.scss'
type TagProps = {
  type?: 'red' | 'orange' | 'green' | 'cyan' | 'gray' | 'neutral'
}
export const Tag: React.FC<TagProps> = ({ children, type }) => {
  let colorClass
  switch (type) {
    case 'red':
      colorClass = styles.Red
      break
    case 'orange':
      colorClass = styles.Orange
      break
    case 'green':
      colorClass = styles.Green
      break
    case 'cyan':
      colorClass = styles.Cyan
      break
    case 'neutral':
      colorClass = styles.Neutral
      break
    case 'gray':
      colorClass = styles.Default
      break
    default:
      colorClass = styles.Default
  }
  return <div className={[styles.Tag, colorClass].join(' ')}>{children}</div>
}
Tag.defaultProps = {
  type: undefined,
}
