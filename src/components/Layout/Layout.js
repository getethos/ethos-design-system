import React from 'react'
import PropTypes from 'prop-types'

import styles from './Layout.module.scss'

export function Layout({ children }) {
  return <div className={styles.Layout}>{children}</div>
}

Layout.propTypes = {
  children: PropTypes.node,
}

/**
 * This component just changes CSS classes depending on the scroll state.
 * (Later, it might be better rewritten as an HOC or without the extra <div>.)
 */
class ScrollDetector extends React.Component {
  state = {
    isScrolled: false,
  }

  componentDidMount() {
    this.updateScrollState()
    this.addScrollListener()
  }

  componentWillUnmount() {
    this.removeScrollListener()
  }

  addScrollListener() {
    console.log('addScrollListener is called before if')
    if (typeof window === 'undefined') return
    console.log('addScrollListener is called after if')
    // Note that this scroll event must be attached to the document
    // and not the element itself -- so onScroll does not work
    window.addEventListener('scroll', this.updateScrollState)
  }

  removeScrollListener() {
    console.log('removeScrollListener is called before if')
    if (typeof window === 'undefined') return
    console.log('removeScrollListener is called before if')
    // Okay since removing an unregistered event listener has no effect
    // https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-removeEventListener
    window.removeEventListener('scroll', this.updateScrollState)
  }

  updateScrollState = () => {
    console.log('updateScrollState is called')
    const scrollTop = window.pageYOffset || window.document.scrollTop
    console.log(`window.pageYOffset ${window.pageYOffset}`)
    console.log(`window.document.scrollTop ${window.document.scrollTop}`)
    console.log(`scrollTop ${scrollTop}`)
    console.log(`this.props.offsetHeight ${this.props.offsetHeight}`)
    this.setState({ isScrolled: scrollTop > this.props.offsetHeight })
  }

  render() {
    const { className, element, offsetHeight, ...rest } = this.props // eslint-disable-line no-unused-vars
    const { isScrolled } = this.state

    const Element = element
    const classNames = [className, isScrolled ? 'isScrolled' : 'isUnscrolled']

    return <Element className={classNames.join(' ')} {...rest} />
  }
}

ScrollDetector.propTypes = {
  className: PropTypes.string,
  element: PropTypes.string,
  offsetHeight: PropTypes.number,
}

ScrollDetector.defaultProps = {
  element: 'div',
  offsetHeight: 0,
}

function HorizontallyPaddedContainer({ className, element, ...rest }) {
  const Element = element
  return (
    <Element
      className={[styles.Container, className].join(' ').trim()}
      {...rest}
    />
  )
}

HorizontallyPaddedContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  element: PropTypes.string,
}

HorizontallyPaddedContainer.defaultProps = {
  element: 'div',
}

// Exports

Layout.Container = HorizontallyPaddedContainer // overloaded alias, deprecated
Layout.HorizontallyPaddedContainer = HorizontallyPaddedContainer

Layout.ScrollDetector = ScrollDetector
