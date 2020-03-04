import {codes} from './constants.js'

export const isEnterKeyPress = (event) => {
  if (
    event.key === 'Enter' ||
    event.which === codes.RETURN ||
    event.keyCode === codes.RETURN
  ) {
    return true
  } else {
    return false
  }
}
