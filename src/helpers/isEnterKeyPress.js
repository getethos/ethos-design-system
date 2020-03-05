import { codes } from './constants.js'

export const isEnterKeyPress = (event) => {
  return (
    event.key === 'Enter' ||
    event.which === codes.RETURN ||
    event.keyCode === codes.RETURN
  )
}
