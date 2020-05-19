import dayjs from '../helpers/getDayjs.js'
import { getMinDateValidator, getMaxDateValidator } from './DateInputValidator'

const MIN_ERROR_MESSAGE = "That's too far in the past!"
const minDate = dayjs('1/1/1700', 'M/D/YYYY')
  .utc()
  .startOf('day')
  .toDate()
const minDateValidator = getMinDateValidator({
  minDate,
  customErrorMessage: MIN_ERROR_MESSAGE,
  dateFormat: 'mm/yyyy',
})
const MAX_ERROR_MESSAGE = "That's too far in the future!"

const maxDate = dayjs('1/1/2030', 'M/D/YYYY')
  .utc()
  .startOf('day')
  .toDate()
const maxDateValidator = getMaxDateValidator({
  maxDate,
  customErrorMessage: MAX_ERROR_MESSAGE,
  dateFormat: 'mm/yyyy',
})

describe('min date', () => {
  test('before or on min', () => {
    expect(minDateValidator('12/1699')).toEqual(MIN_ERROR_MESSAGE)
    expect(minDateValidator('01/1700')).toEqual(MIN_ERROR_MESSAGE)
  })
  test('after min boundary', () => {
    expect(minDateValidator('02/1700')).toEqual('')
  })
})

describe('max date', () => {
  test('after or on max', () => {
    expect(maxDateValidator('1/2031')).toEqual(MAX_ERROR_MESSAGE)
    expect(maxDateValidator('01/2030')).toEqual(MAX_ERROR_MESSAGE)
  })
  test('before max boundary', () => {
    expect(maxDateValidator('12/2029')).toEqual('')
  })
})
