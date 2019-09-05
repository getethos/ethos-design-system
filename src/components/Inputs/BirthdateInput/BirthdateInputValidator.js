import React from 'react'

export const getMaxDateValidator = ({
  maxDate,
  customErrorMessage,
  dateFormat = 'mm/dd/yyyy',
}) => (value) => {
  // Should pass if there is no value
  // if (value == null || value === '') return undefined
  // const m = moment(maxDate)
  // const momentDateFormat = DATE_FORMAT_TO_MOMENT_FORMAT[dateFormat]
  // const errorMessage =
  //   customErrorMessage ||
  //   `Please enter a date before ${m.format(momentDateFormat)}`
  // return moment(value).isBefore(m) ? undefined : errorMessage
  return undefined
}

export const getMinDateValidator = ({
  minDate,
  customErrorMessage,
  dateFormat = 'mm/dd/yyyy',
}) => (value) => {
  // Should pass if there is no value
  // if (value == null || value === '') return undefined

  // const m = moment(minDate)
  // const momentDateFormat = DATE_FORMAT_TO_MOMENT_FORMAT[dateFormat]
  // const errorMessage =
  //   customErrorMessage ||
  //   `Please enter a date after ${m.format(momentDateFormat)}`
  // return moment(value).isAfter(m) ? undefined : errorMessage
  return undefined
}
