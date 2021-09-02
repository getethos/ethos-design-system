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
    capitalize,
    labelCopy,
    validator,
    formChangeHandler,
    initialValue,
    currentValue,
    currentError,
    formTouched,
    setFieldTouched,
    disabled,
    guide = true,
    keepCharPositions = true,
    name = 'birthdate-auto-corrected',
    pipe = createAutoCorrectedDatePipe(dateFormat),
    mask = dateMaskByFormat[dateFormat],
    autoComplete,
    classOverrides,
    ...restProps
  } = props
  const [getError, setError, , validate] = useErrorMessage(validator)
  const val = currentValue || initialValue
  const [touched, setTouched] = useState(initialValue ? true : false)
  const [value] = useState(val || '')

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
    const base = `DateInput ${styles.TextInputCommon}`
    if (getError(currentError, touched)) {
      return `${base} ${errorStyles.Error}`
    }
    return classOverrides
      ? `${base} ${classOverrides}`
      : `${base} ${styles.TextInputStylable}`
  }

  return (
    <>
      <TextMaskedInput
        initialValue={value}
        optional={optional}
        mask={mask}
        pipe={pipe}
        className={getClasses()}
        type="tel"
        labelCopy={labelCopy}
        labelColor={props.labelColor}
        labelWeight={props.labelWeight}
        labelClasses={props.labelClasses}
        allCaps={allCaps}
        capitalize={capitalize}
        data-tid={restProps['data-tid']}
        guide={guide}
        doValidation={doValidation}
        name={name}
        placeholder={dateFormat}
        keepCharPositions={keepCharPositions}
        currentValue={currentValue}
        currentError={currentError}
        formTouched={formTouched}
        setFieldTouched={setFieldTouched}
        getTouched={touched}
        setTouched={setTouched}
        disabled={disabled}
        autoComplete={autoComplete}
        classOverrides={classOverrides}
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
  /** text transform capitalize label */
  capitalize: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  initialValue: PropTypes.string,
  guide: PropTypes.bool,
  keepCharPositions: PropTypes.bool,
  autoComplete: PropTypes.string,
  classOverrides: PropTypes.string,
  labelColor: PropTypes.string,
  labelWeight: PropTypes.string,
  labelClasses: PropTypes.string,
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
