import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './HelpTip.module.scss'

export const HelpTip = ({
  labelCopy,
  helpCopy,
  disabled,
  position,
  alignLeftTo,
  ...rest,
}) => {

  const [hover, setHover ] = useState(false)

  // TODO --- maybe put this in use layout effect and only run it once so we don't repaint
  const getAlignLeft = () => {
    console.log('getAlignLeft called...')
    let styles = {}
    const el = document.querySelector(alignLeftTo)
    if (el) {
      const rect = el.getBoundingClientRect();
      const win = el.ownerDocument.defaultView;
      const leftCalculated = rect.left + win.pageXOffset
      styles.left = `${leftCalculated}px`
      styles.width = `calc(100vw - ${leftCalculated + 96}px)`

      if (rect.top < 72) {
        styles.top= `${rect.top + 96}px`
      } else {
        styles.top= `${rect.top - 16}px` //Note--we're using position fixed so no need to add pageYOffSet
      }
      styles.position = 'fixed'
      styles.transform = 'translate(0%, -100%)'
      styles.overflow = 'visible'
      styles.zIndex = '1'
    }
    return styles
  }

  const toggleHover = () => {
    console.log('toggleHover called...')
    setHover(!hover)
  }

  const getDynamicStyles = () => {
    let styles = {
      // minWidth: rest['min-width'],
    }
    const alignLeftEl = alignLeftTo
    if (alignLeftTo) {
      styles = Object.assign({}, styles, getAlignLeft())
    }
    return styles
  }

  return (
    <div aria-label={labelCopy} data-tid={rest['data-tid']} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <span className={styles.info} data-pos={position}>
        i
      </span>
      <span className={styles.tip} style={ getDynamicStyles() } >
        {helpCopy}
      </span>
    </div>
  )
}

HelpTip.propTypes = {
  className: PropTypes.string,
  labelCopy: PropTypes.string.isRequired,
  helpCopy: PropTypes.string.isRequired,
  'data-tid': PropTypes.string.isRequired,
  'min-width': PropTypes.number,
  disabled: PropTypes.bool,
  position: PropTypes.string,
  alignLeftTo: PropTypes.string,
}

HelpTip.defaultProps = {
  position: 'above',
  // 'min-width': 500,
}
