import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextMaskedInput } from '../TextMaskedInput'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import { InputLabel } from '../InputLabel'
import styles from '../TextInput/TextInput.module.scss'
import errorStyles from '../Errors.module.scss'

import dayjs from '../../../helpers/getDayjs.js'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import useInputValidation from '../../../hooks/useInputValidation.js'
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
    initialValue,
    ...restProps
  } = props

  const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy')
  const [getError, setError, validate] = useErrorMessage(validator)
  const [touched, setTouched] = useState(initialValue ? true : false)
  const [value, setValue] = useState(initialValue || '')

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

  const [doValidation] = useInputValidation({validate, setError, formChangeHandler, callErrorHandlers})

  const getClasses = () => {
    return !!getError() ?
      `BirthdateInput ${styles.TextInput} ${errorStyles.Error}` :
      `BirthdateInput ${styles.TextInput}`
  }

  return (
    <>
      <TextMaskedInput
        initialValue={value}
        mask={dateMaskByFormat[dateFormat]}
        pipe={autoCorrectedDatePipe}
        className={getClasses()}
        type="tel"
        labelCopy={labelCopy}
        allCaps={allCaps}
        data-tid={restProps['data-tid']}
        guide={true}
        doValidation={doValidation}
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
