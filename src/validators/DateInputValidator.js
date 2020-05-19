import dayjs from '../helpers/getDayjs.js'

export const DATE_FORMATS = ['mm/dd/yyyy', 'mm/yyyy', 'mm/yy']

export const dateMaskByFormat = {
  'mm/dd/yyyy': [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  'mm/yyyy': [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  'mm/yy': [/\d/, /\d/, '/', /\d/, /\d/],
}

export const dateRegexByFormat = {
  'mm/dd/yyyy': /\d\d\/\d\d\/\d\d\d\d/,
  'mm/yyyy': /\d\d\/\d\d\d\d/,
  'mm/yy': /\d\d\/\d\d/,
}

export const dateStringMatchesFormat = (cleansedDateString, dateFormat) => {
  const pattern = dateRegexByFormat[dateFormat]
  const matchesFormat = pattern.test(cleansedDateString)
  if (!matchesFormat) {
    return 'Please enter a valid date.'
  }
  return ''
}

/**
 * Verifies that a date is "before" `maxDate`.
 * @param {*} props
 * @param {object} maxDate a dayjs object representing the maximum incoming date
 * must be after
 * @param {string} customErrorMessage -- error message
 * @param {string} dateFormat -- defaults to `mm/dd/yyyy` but any of:
 * `'mm/dd/yyyy', 'mm/yyyy', 'mm/yy'` may be used.
 */
export const getMaxDateValidator = (props) => {
  const { maxDate, customErrorMessage, dateFormat = 'mm/dd/yyyy' } = props

  return (value) => {
    if (value == null || value === '') return ''
    const date = dayjs(maxDate)
    const dayjsFormat = dateFormat.toUpperCase()
    const errorMessage =
      customErrorMessage ||
      `Please enter a date before ${date.format(dayjsFormat)}`
    return dayjs(value, dayjsFormat).isBefore(date) ? '' : errorMessage
  }
}

/**
 * Verifies that a date is "after" `minDate`. Note that the underlying `isAfter`
 * method of dayjs will return False for this if, for example, you've set `1/1/1700`
 * and then want to verify 1/1/1700 is after (since they are the same!)
 * @param {*} props
 * @param {object} minDate a dayjs object representing the minimum incoming date
 * must be after
 * @param {string} customErrorMessage -- error message
 * @param {string} dateFormat -- defaults to `mm/dd/yyyy` but any of:
 * `'mm/dd/yyyy', 'mm/yyyy', 'mm/yy'` may be used.
 */
export const getMinDateValidator = (props) => {
  const { minDate, customErrorMessage, dateFormat = 'mm/dd/yyyy' } = props

  return (value) => {
    // Should pass if there is no value
    if (value == null || value === '') return ''
    const date = dayjs(minDate)
    const dayjsFormat = dateFormat.toUpperCase()
    const errorMessage =
      customErrorMessage ||
      `Please enter a date before ${date.format(dayjsFormat)}`
    return dayjs(value, dayjsFormat).isAfter(date) ? '' : errorMessage
  }
}

export const validateMinMaxDateFactory = (props) => {
  const {
    minBirthdate,
    maxBirthdate,
    minAge,
    maxAge,
    dateFormat,
    customErrorMessage,
  } = props

  return (value) => {
    const dateRangeErrorMessage =
      customErrorMessage || `Sorry, you must be ${minAge}–${maxAge}.`

    const maxError = getMaxDateValidator({
      maxDate: maxBirthdate,
      customErrorMessage: dateRangeErrorMessage,
      dateFormat,
    })(value)

    const minError = getMinDateValidator({
      minDate: minBirthdate,
      customErrorMessage: dateRangeErrorMessage,
      dateFormat,
    })(value)

    return minError.length || maxError.length ? dateRangeErrorMessage : ''
  }
}
