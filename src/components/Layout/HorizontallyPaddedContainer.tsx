import * as React from 'react'
import styles from './Layout.module.scss'
type HorizontallyPaddedContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  element?: string
}
export const HorizontallyPaddedContainer: React.SFC<HorizontallyPaddedContainerProps> = ({
  className,
  element = 'div',
  ...rest
}) => {
  return React.createElement(element, {
    className: [styles.Container, className].join(' ').trim(),
    ...rest,
  })
}
