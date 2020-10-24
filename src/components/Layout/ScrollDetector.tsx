import * as React from 'react'
type ScrollDetectorProps = {
  className?: string
  element?: string
  offsetHeight?: number
}
type ScrollDetectorState = {
  isScrolled: boolean
}
/**
 * This component just changes CSS classes depending on the scroll state.
 * (Later, it might be better rewritten as an HOC or without the extra <div>.)
 */
export class ScrollDetector extends React.Component<
  ScrollDetectorProps,
  ScrollDetectorState
> {
  static defaultProps = {
    element: 'div',
    offsetHeight: 0,
  }
  state = {
    isScrolled: false,
  }
  componentDidMount() {
    this.addScrollListener()
  }
  componentWillUnmount() {
    this.removeScrollListener()
  }
  addScrollListener() {
    if (typeof window === 'undefined') return
    // Note that this scroll event must be attached to the document
    // and not the element itself -- so onScroll does not work
    window.addEventListener('scroll', this.updateScrollState)
  }
  removeScrollListener() {
    if (typeof window === 'undefined') return
    // Okay since removing an unregistered event listener has no effect
    // https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-removeEventListener
    window.removeEventListener('scroll', this.updateScrollState)
  }
  updateScrollState = () => {
    const { offsetHeight = 0 } = this.props
    const scrollTop = window.pageYOffset
    this.setState({
      isScrolled: scrollTop > offsetHeight,
    })
  }
  render() {
    const { className, element = 'div', offsetHeight = 0, ...rest } = this.props // eslint-disable-line no-unused-vars
    const { isScrolled } = this.state
    const classNames = [className, isScrolled ? 'isScrolled' : 'isUnscrolled']
    return React.createElement(element, {
      className: classNames.join(' '),
      ...rest,
    })
  }
}
