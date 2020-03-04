import React from 'react'

/**
 * Splitting on spaces, convert a string to an array and remove the last element.
 * Will strip the last word from a string including punctuation.
 */
export const removeLastWord = (text) => {
  const alteredText = text.trim().split(' ')
  return `${alteredText.slice(0, alteredText.length - 1).join(' ')} `
}

/**
 * Get the last word of a sentence including punctuation, splitting on spaces.
 */
export const getLastWord = (text) => {
  return text
    .trim()
    .split(' ')
    .pop()
}

/**
 * Use this to wrap things like icons in a span with the last word of a text string.
 * Doing so will prevent the icon from being isolated on a newline without any word.
 */
export const IconIntegratedTitle = ({ title, children }) => {
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
