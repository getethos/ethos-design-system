import React from 'react'
import PropTypes from 'prop-types'

export function Layout({ children }) {
  return <div className="Layout">{children}</div>
}

Layout.propTypes = {
  children: PropTypes.node,
}

/**
 * This component just changes CSS classes depending on the scroll state.
 * (Later, it might be better rewritten as an HOC or without the extra <div>.)
 */
class ScrollDetector extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    element: PropTypes.string,
    offsetHeight: PropTypes.number,
  }

  static defaultProps = {
    element: 'div',
    offsetHeight: 0,
  }

  state = {
    isScrolled: false,
  }

  componentWillMount() {
    this.addScrollListener()
  }

  componentWillUnmount() {
    this.removeScrollListener()
  }

  addScrollListener() {
    if (typeof window === 'undefined') return
    // Note that this scroll event must be attached to the document
    // and not the element itself -- so onScroll does not work;
    window.addEventListener('scroll', this.updateScrollState)
  }

  removeScrollListener() {
    if (typeof window === 'undefined') return
    // Okay since removing an unregistered event listener has no effect
    // https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-removeEventListener
    window.removeEventListener('scroll', this.updateScrollState)
  }

  updateScrollState = () => {
    const scrollTop = window.pageYOffset || window.document.scrollTop
    this.setState({ isScrolled: scrollTop > this.props.offsetHeight })
  }

  render() {
    const { className, element, offsetHeight, ...rest } = this.props
    const { isScrolled } = this.state

    const Element = element
    const classNames = [className, isScrolled ? 'isScrolled' : 'isUnscrolled']

    return <Element className={classNames.join(' ')} {...rest} />
  }
}

function HorizontallyPaddedContainer({ className, element, ...rest }) {
  const Element = element
  return (
    <Element className={['Container', className].join(' ').trim()} {...rest} />
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

function CenterHorizontally({ children }) {
  return <div className="CenterHorizontally">{children}</div>
}

CenterHorizontally.propTypes = {
  children: PropTypes.node,
}

// Exports

Layout.CenterHorizontally = CenterHorizontally

Layout.Container = HorizontallyPaddedContainer // overloaded alias, deprecated
Layout.HorizontallyPaddedContainer = HorizontallyPaddedContainer

Layout.ScrollDetector = ScrollDetector
