import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useEffect, useState } from 'react'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import cleanse from '../../helpers/cleanse.js'
import dayjs from '../../helpers/getDayjs.js'
import useErrorMessage from '../../hooks/useErrorMessage'
import useInputValidation from '../../hooks/useInputValidation'
import * as Validators from '../../validators/DateInputValidator'
import { PublicFormProps } from '../Form/Form'
import { TextMaskedInput } from '../TextMaskedInput'
const { DATE_FORMATS, dateMaskByFormat, dateStringMatchesFormat } = Validators
const PUBLIC_PROPS = {
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
}
type PrivateDateInputProps = PublicFormProps & {
  dateFormat?: any
  disabled?: boolean
  allCaps?: boolean
  capitalize?: boolean
  labelCopy: string
  initialValue?: string
  guide?: boolean
  keepCharPositions?: boolean
  pipe?: any
  mask?: (string | RegExp)[]
}
export const PrivateDateInput: React.FC<PrivateDateInputProps> & {
  PUBLIC_PROPS: typeof PUBLIC_PROPS
} = (props) => {
  const {
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
      errorMessage =
        (typeof errorMessage === 'string' || Array.isArray(errorMessage)) &&
        errorMessage.length
          ? errorMessage
          : ''
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
  return (
    <>
      <TextMaskedInput
        initialValue={value}
        mask={mask}
        pipe={pipe}
        type="tel"
        labelCopy={labelCopy}
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
      />
      {getError(currentError, touched)}
    </>
  )
}
PrivateDateInput.PUBLIC_PROPS = PUBLIC_PROPS
PrivateDateInput.defaultProps = {
  dateFormat: 'mm/dd/yyyy',
  labelCopy: 'Date',
}