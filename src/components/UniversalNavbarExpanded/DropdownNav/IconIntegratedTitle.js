import React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { removeLastWord, getLastWord } from '../../../helpers/words'

/**
 * Use this to wrap things like icons in a span with the last word of a text string.
 * Doing so will prevent the icon from being isolated on a newline without any word.
 *
 * @param {string} title - Some text to integrate the icon into.
 * @param {ReactNode} children - Icon to integrate into title.
 *
 * @return {JSX.Element}
 */
const IconIntegratedTitle = ({ title, children }) => {
  return (
    <>
      <span>{removeLastWord(title)}</span>
      <div style={{ display: 'inline-block' }}>
        <span>{getLastWord(title)}</span>
        {children}
      </div>
    </>
  )
}

export default IconIntegratedTitle

IconIntegratedTitle.propTypes = {
  /** `title` - (string) Some text to integrate the icon into. */
  title: PropTypes.string,
  /** `children` - (ReactNode) Icon to integrate into title. */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
}
