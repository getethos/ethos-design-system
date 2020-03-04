const ENTER_KEY_CODE = 13

export const isEnterKeyPress = (event) => {
  if (
    event.key === 'Enter' ||
    event.which === ENTER_KEY_CODE ||
    event.keyCode === ENTER_KEY_CODE
  ) {
    return true
  } else {
    return false
  }
}
