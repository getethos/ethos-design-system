import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TextMaskedInput } from '../TextMaskedInput'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import styles from '../TextInput/TextInput.module.scss'
import errorStyles from '../Errors.module.scss'
import dayjs from '../../helpers/getDayjs.js'
import useErrorMessage from '../../hooks/useErrorMessage.js'
import useInputValidation from '../../hooks/useInputValidation.js'
import * as Validators from '../../validators/DateInputValidator'
import cleanse from '../../helpers/cleanse.js'

const { DATE_FORMATS, dateMaskByFormat, dateStringMatchesFormat } = Validators

const PrivateDateInput = (props) => {
  const {
    optional,
    dateFormat,
    allCaps,
    labelCopy,
    validator,
    formChangeHandler,
    initialValue,
    currentValue,
    currentError,
    formTouched,
    setFieldTouched,
    ...restProps
  } = props

  const autoCorrectedDatePipe = createAutoCorrectedDatePipe(dateFormat)
  const [getError, setError, , validate] = useErrorMessage(validator)
  const val = currentValue || initialValue
  const [touched, setTouched] = useState(initialValue ? true : false)
  const [value] = useState(val || '')

  const callErrorHandlers = (value, handlerFn) => {
    const cleansed = cleanse(value)

    console.log(
      'Check date string format validity -- date format: ',
      dateFormat
    )
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

  // Initial Value aka prefilled—are considered "touched", but must prevalidate
  // which will in turn update the internal form state as to their validity
  useEffect(() => {
    if (!!formChangeHandler && initialValue) {
      doValidation(initialValue, true)
    }
  }, [])

  const [doValidation] = useInputValidation({
    validate,
    setError,
    formChangeHandler,
    callErrorHandlers,
  })

  const getClasses = () => {
    return getError(currentError, touched)
      ? `DateInput ${styles.TextInput} ${errorStyles.Error}`
      : `DateInput ${styles.TextInput}`
  }

  return (
    <>
      <TextMaskedInput
        initialValue={value}
        optional={optional}
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
        currentValue={currentValue}
        currentError={currentError}
        formTouched={formTouched}
        setFieldTouched={setFieldTouched}
        getTouched={touched}
        setTouched={setTouched}
      />
      {getError(currentError, touched)}
    </>
  )
}

PrivateDateInput.PUBLIC_PROPS = {
  optional: PropTypes.bool,
  dateFormat: PropTypes.oneOf(DATE_FORMATS),
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  initialValue: PropTypes.string,
}

PrivateDateInput.propTypes = {
  ...PrivateDateInput.PUBLIC_PROPS,
}

PrivateDateInput.defaultProps = {
  dateFormat: 'mm/dd/yyyy',
  labelCopy: 'Date',
}

const DateInputFactory = (privateProps) => {
  const PublicDateInputComponent = (downstreamProps) => {
    return <PrivateDateInput {...downstreamProps} {...privateProps} />
  }

  return PublicDateInputComponent
}

export const DateInput = DateInputFactory()

export const DateInputValidators = Validators
