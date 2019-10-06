import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import { InputLabel } from '../InputLabel'

import dayjs from '../../../helpers/getDayjs.js'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import * as Validators from '../../../validators/BirthdateInputValidator'
const {
  cleanse,
  DATE_FORMATS,
  dateMaskByFormat,
  dateStringMatchesFormat,
  validateMinMaxDateFactory,
} = Validators

const PrivateBirthdateInput = (props) => {
  const {
    name,
    dateFormat,
    allCaps,
    labelCopy,
    validator,
    formChangeHandler,
    ...restProps
  } = props

  const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy')
  const [getError, setError, validate] = useErrorMessage(validator)
  const [touched, setTouched] = useState(false)

  const setErrorWrapper = (cleansed, errorValue) => {
    if (!!formChangeHandler) {
      formChangeHandler(cleansed, errorValue)
    }
    setError(errorValue)
  }

  const callErrorHandlers = (value, handlerFn) => {
    const cleansed = cleanse(value)

    // Check date string format validity
    let errMsg = dateStringMatchesFormat(cleansed, dateFormat)
    const errorMessage = errMsg.length ? errMsg : ''
    if (errorMessage.length) {
      handlerFn(value, errorMessage)
    } else {
      /**
       * Note that, only once we get here, do the validators
       * get called. This is because dateStringMatchesFormat
       * is a prerequisite at the text-mask level so there's
       * no point in doing other validations if we don't even
       * have a date in valid format yet.
       */

      // Call addtional validators consumer setup (e.g. date range)
      // Note if no validators, we're still safe as validate checks
      const df = dateFormat.toUpperCase()
      const conformedDate = dayjs(value, df).format(df)
      let errorMessage = validate(conformedDate)
      errorMessage = errorMessage.length ? errorMessage : ''
      handlerFn(value, errorMessage)
    }
  }

  const doValidation = (value, isTouched) => {
    // User hasn't blurred but we still need to inform form
    // engine if we're in a valid state or not
    if (!isTouched && !!formChangeHandler) {
      callErrorHandlers(value, formChangeHandler)
    } else {
      // Have blurred
      callErrorHandlers(value, setErrorWrapper)
    }
  }

  const onBlur = (ev) => {
    // We set touched to change the react state, but it's async and
    // processing still, so, we use a flag for doValidation
    setTouched(true)
    doValidation(ev.target.value, true)
  }

  const onChange = (ev) => {
    // We call setTouched in onBlur, so can reliably call getter here
    doValidation(ev.target.value, touched)
  }

  return (
    <>
      <InputLabel name={name} labelCopy={labelCopy} allCaps={allCaps} />
      <MaskedInput
        mask={dateMaskByFormat[dateFormat]}
        pipe={autoCorrectedDatePipe}
        className={
          !!getError()
            ? 'BirthdateInput TextInput Error'
            : 'BirthdateInput TextInput'
        }
        type="tel"
        data-tid={restProps['data-tid']}
        guide={true}
        onBlur={onBlur}
        onChange={onChange}
        name="birthdate-auto-corrected"
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
  allCaps: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  onChange: PropTypes.func,
}

PrivateBirthdateInput.propTypes = {
  ...PrivateBirthdateInput.PUBLIC_PROPS,
}

PrivateBirthdateInput.defaultProps = {
  dateFormat: 'mm/dd/yyyy',
  labelCopy: 'Birthdate',
}

const BirthdateInputFactory = (privateProps) => {
  const PublicBirthdateInputComponent = (downstreamProps) => {
    return <PrivateBirthdateInput {...downstreamProps} {...privateProps} />
  }

  return PublicBirthdateInputComponent
}

export const BirthdateInput = BirthdateInputFactory()

export const BirthdateInputValidators = Validators
