import PropTypes from 'prop-types'
import React from 'react'
import { HorizontallyPaddedContainer } from './HorizontallyPaddedContainer'
import styles from './Layout.module.scss'
import { ScrollDetector } from './ScrollDetector'

export function Layout({ children }) {
  return <div className={styles.Layout}>{children}</div>
}

Layout.propTypes = {
  children: PropTypes.node,
}

// Exports

Layout.Container = HorizontallyPaddedContainer // overloaded alias, deprecated
Layout.HorizontallyPaddedContainer = HorizontallyPaddedContainer

Layout.ScrollDetector = ScrollDetector
