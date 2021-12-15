const validateNumberRange = (
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  message = `Input number must be between ${min} and ${max}`
) => {
  function validateMinMax(value) {
    return value < min || value > max ? message : undefined
  }
  return validateMinMax
}

export default validateNumberRange
