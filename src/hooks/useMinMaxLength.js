import React from 'react'

const useMinMaxLength = (
  min,
  max,
  message = `Must be between ${min} and ${max} characters`
) => {

  const minMaxValidator = (value) => {
    const valueString = value ? String(value) : ''
    const isInvalidMin = valueString && valueString.length < min
    const isInvalidMax = valueString && valueString.length > max
    return isInvalidMin || isInvalidMax ? message : undefined
  }
  return [minMaxValidator]
}

export default useMinMaxLength
