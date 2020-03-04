export const removeLastWord = (text) => {
  const alteredText = text.trim().split(' ')
  return `${alteredText.slice(0, alteredText.length - 1).join(' ')} `
}

export const getLastWord = (text) => {
  return text
    .trim()
    .split(' ')
    .pop()
}
