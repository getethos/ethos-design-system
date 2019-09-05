import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

// https://github.com/iamkun/dayjs/issues/480
import * as dayjs_ from 'dayjs';
const dayjs = (dayjs_).default || dayjs_;

import useErrorMessage from '../../../hooks/useErrorMessage.js'
import { Body, COLORS } from '../../index'
import {
  getMinDateValidator,
  getMaxDateValidator
} from './BirthdateInputValidator.js'

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

const PrivateBirthdateInput = (props) => {
  const {
    minAge,
    maxAge,
    name,
    dateFormat,
    labelCopy,
    validator,
    ...restProps } = props

  const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy')
  const [getError, setError, validate] = useErrorMessage(validator)

  /*
  const maxBirthdate = moment()
    .subtract(minAge, 'years')
    .utc()
    .endOf('day')
    .toDate()

  const minBirthdate = moment()
    .subtract(maxAge + 1, 'years')
    .utc()
    .startOf('day')
    .toDate()

  export const dateRangeErrorMessage = `Sorry, you must be ${minAge}–${maxAge}.`

  export const maxDateValidator = getMaxDateValidator({
    maxDate: maxBirthdate,
    customErrorMessage: dateRangeErrorMessage,
  })

  export const minDateValidator = getMinDateValidator({
    minDate: minBirthdate,
    customErrorMessage: dateRangeErrorMessage,
  })
  */

  return (
    <>
      <Body.Regular400
        element="label"
        htmlFor={name}
        color={COLORS.GRAY_PRIMARY}
      >
        {labelCopy}
      </Body.Regular400>

      <MaskedInput
        mask={dateMaskByFormat[dateFormat]}
        pipe={autoCorrectedDatePipe}
        className='BirthdateInput TextInput'
        type='text'
        data-tid={restProps['data-tid']}
        guide={true}
        // onBlur={() => {}}
        // onChange={() => {}}
        name='birthdate-auto-corrected'
        placeholder={dateFormat}
        keepCharPositions={true}
      />
      {getError()}
    </>
  )
}

PrivateBirthdateInput.PUBLIC_PROPS = {
  dateFormat: PropTypes.oneOf(DATE_FORMATS),
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  minAge: PropTypes.number,
  maxAge: PropTypes.number,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
}

PrivateBirthdateInput.propTypes = {
  ...PrivateBirthdateInput.PUBLIC_PROPS,
}

PrivateBirthdateInput.defaultProps = {
  dateFormat: 'mm\/dd\/yyyy',
  labelCopy: 'Birthdate',
}

const BirthdateInputFactory = (privateProps) => {
  const PublicBirthdateInputComponent = (downstreamProps) => {
    return <PrivateBirthdateInput {...downstreamProps} {...privateProps} />
  }

  return PublicBirthdateInputComponent
}

export const BirthdateInput = BirthdateInputFactory()
