const validateMinMaxFactory = (
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  message = `Must be between ${min} and ${max} characters`
) => {
  function validateMinMax(value) {
    const valueString = value ? String(value) : ''
    const isInvalidMin = valueString && valueString.length < min
    const isInvalidMax = valueString && valueString.length > max
    return isInvalidMin || isInvalidMax ? message : undefined
  }

  return validateMinMax
}

export default validateMinMaxFactory
