import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

import { INPUT_MODES } from '../../../constants'
import dayjs from '../../../helpers/getDayjs.js'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import { InfoMessage } from '../../index'
import { InputLabel } from '../InputLabel'
import { Spacer } from '../../Spacer'
import * as Validators from './BirthdateInputValidator'

const {
  cleanse,
  DATE_FORMATS,
  dateMaskByFormat,
  dateRegexByFormat,
  dateStringMatchesFormat,
} = Validators

const PrivateBirthdateInput = (props) => {
  const {
    minAge,
    maxAge,
    name,
    dateFormat,
    allCaps,
    labelCopy,
    validator,
    onChange,
    forcedErrorMessage,
    value,
    ...restProps
  } = props

  const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy')
  const [touched, setTouched] = useState(false)

  const onBlur = (syntheticReactEvent) => {
    //   const cleansed = cleanse(syntheticReactEvent.target.value)
    setTouched(true)
  }

  //   // First check in valid format as that error takes priority
  //   let errMsg = dateStringMatchesFormat(cleansed, dateFormat)
  //   if (forcedErrorMessage) {
  //     setError(forcedErrorMessage)
  //   } else if (errMsg.length) {
  //     setError(errMsg)
  //   } else {
  //     // Now we let the validator validate the date range
  //     const conformedDate = dayjs(cleansed, dateFormat.toUpperCase())
  //     errMsg = validate(conformedDate)
  //     if (errMsg.length) {
  //       setError(errMsg)
  //     } else {
  //       // Passed all checks, reset error empty
  //       setError('')
  //     }
  //   }

  //   privateOnChange(syntheticReactEvent)
  // }

  // const privateOnChange = (syntheticReactEvent) => {
  //   if (!touched) return
  //   const cleansed = cleanse(syntheticReactEvent.target.value)
  //   const errMsg = dateStringMatchesFormat(cleansed, dateFormat)
  //   if (errMsg.length) {
  //     setError(errMsg)
  //   } else {
  //     setError('')
  //   }

  //   // TODO stop copying this code in all text inputs
  //   if (!!onChange) {
  //     onChange(syntheticReactEvent)
  //   }
  // }

  const err =
    touched && forcedErrorMessage ? (
      <>
        <Spacer.H8 />
        <InfoMessage.Text.Error>{forcedErrorMessage} </InfoMessage.Text.Error>
      </>
    ) : null

  return (
    <>
      <InputLabel
        name={'birthdate-auto-corrected'}
        labelCopy={labelCopy}
        allCaps={allCaps}
      />
      <MaskedInput
        mask={dateMaskByFormat[dateFormat]}
        pipe={autoCorrectedDatePipe}
        className={
          !!err ? 'BirthdateInput TextInput Error' : 'BirthdateInput TextInput'
        }
        type="text"
        inputMode={INPUT_MODES.NUMERIC}
        data-tid={restProps['data-tid']}
        guide={true}
        onBlur={onBlur}
        onChange={onChange}
        name="birthdate-auto-corrected"
        placeholder={dateFormat}
        keepCharPositions={true}
      />
      {err}
    </>
  )
}

PrivateBirthdateInput.PUBLIC_PROPS = {
  dateFormat: PropTypes.oneOf(DATE_FORMATS),
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  minAge: PropTypes.number,
  maxAge: PropTypes.number,
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
