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
