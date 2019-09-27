import React from 'react'
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
} = Validators

// Riffing off redux-form a bit: "this will be set when the field is blurred"
let touched = false

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

  const setErrorWrapper = (cleansed, errorValue) => {
    if (!!formChangeHandler) {
      formChangeHandler(cleansed, errorValue)
    }
    setError(errorValue)
  }

  const onBlur = (syntheticReactEvent) => {
    const cleansed = cleanse(syntheticReactEvent.target.value)
    touched = true

    // First check in valid format as that error takes priority
    let errMsg = dateStringMatchesFormat(cleansed, dateFormat)
    if (errMsg.length) {
      setErrorWrapper(cleansed, errMsg)
    } else {
      // Now we let the validator validate the date range
      const df = dateFormat.toUpperCase()
      const conformedDate = dayjs(cleansed, df).format(df)
      errMsg = validate(conformedDate)
      if (errMsg.length) {
        setErrorWrapper(cleansed, errMsg)
      } else {
        // Passed all checks, reset error empty
        setErrorWrapper(cleansed, '')
      }
    }
  }

  const onChange = (syntheticReactEvent) => {
    if (!touched) return
    const cleansed = cleanse(syntheticReactEvent.target.value)
    const errMsg = dateStringMatchesFormat(cleansed, dateFormat)
    if (errMsg.length) {
      setErrorWrapper(cleansed, errMsg)
    } else {
      setErrorWrapper(cleansed, '')
    }
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
        type="text"
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
