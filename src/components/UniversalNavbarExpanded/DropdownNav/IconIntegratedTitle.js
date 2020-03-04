import React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { removeLastWord, getLastWord } from '../../../helpers/words'

/**
 * Use this to wrap things like icons in a span with the last word of a text string.
 * Doing so will prevent the icon from being isolated on a newline without any word.
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
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}
