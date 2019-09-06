import React from 'react'
import dayjs from '../../../helpers/getDayjs.js'

export const DATE_FORMATS = [
  'mm/dd/yyyy',
  'mm/yyyy',
  'mm/yy',
]

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

// first replace removes text-mask's underscores, second fixes like: '2//'
export const cleanse = (value) => value.replace(/[_]/g,'').replace('//', '/')

export const dateStringMatchesFormat = (cleansedDateString, dateFormat) => {
  const pattern = dateRegexByFormat[dateFormat];
  const matchesFormat = pattern.test(cleansedDateString);
  if (!matchesFormat) {
    return 'Please enter a valid date.'
  }
  return '';
}

export const getMaxDateValidator = (props) => {
  const {
    maxDate,
    customErrorMessage,
    dateFormat,
  } = props

  return (value) => {
    if (value == null || value === '') return ''
    const date = dayjs(maxDate);
    const dayjsFormat = dateFormat.toUpperCase();
    const errorMessage =
      customErrorMessage ||
      `Please enter a date before ${date.format(dayjsFormat)}`
    return dayjs(value).isBefore(date) ? '' : errorMessage
  }
}

export const getMinDateValidator = (props) => {
  const {
    minDate,
    customErrorMessage,
    dateFormat,
  } = props

  return (value) => {
    // Should pass if there is no value
    if (value == null || value === '') return ''
    const date = dayjs(minDate);
    const dayjsFormat = dateFormat.toUpperCase();
    const errorMessage =
      customErrorMessage ||
      `Please enter a date before ${date.format(dayjsFormat)}`
    return dayjs(value).isAfter(date) ? '' : errorMessage
  }
}

export const getMinMaxDateValidator = (props) => {
  const {
    minAge,
    maxAge,
    dateFormat,
    customErrorMessage,
  } = props;

  return (value) => {
    const dateRangeErrorMessage = customErrorMessage || `Sorry, you must be ${minAge}–${maxAge}.`
    const minBirthdate = dayjs()
      .subtract(maxAge + 1, 'years')
      .endOf('day')
      .toDate()

    const maxBirthdate = dayjs()
      .subtract(minAge, 'years')
      .endOf('day')
      .toDate()

    const maxError = getMaxDateValidator({
      maxDate: maxBirthdate,
      customErrorMessage: dateRangeErrorMessage,
      dateFormat,
    })(value);

    const minError = getMinDateValidator({
      minDate: minBirthdate,
      customErrorMessage: dateRangeErrorMessage,
      dateFormat,
    })(value);

    return minError.length || maxError.length ? dateRangeErrorMessage : '';
  }
}
