import * as React from 'react'
import { HorizontallyPaddedContainer } from './HorizontallyPaddedContainer'
import styles from './Layout.module.scss'
import { ScrollDetector } from './ScrollDetector'
export const Layout: React.FC<{}> & {
  Container: typeof HorizontallyPaddedContainer
  HorizontallyPaddedContainer: typeof HorizontallyPaddedContainer
  ScrollDetector: typeof ScrollDetector
} = ({ children }) => {
  return <div className={styles.Layout}>{children}</div>
}
// Exports
Layout.Container = HorizontallyPaddedContainer // overloaded alias, deprecated
Layout.HorizontallyPaddedContainer = HorizontallyPaddedContainer
Layout.ScrollDetector = ScrollDetector
