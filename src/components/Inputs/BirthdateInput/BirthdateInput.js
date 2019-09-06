import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

import dayjs from '../../../helpers/getDayjs.js'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import { Caption, Spacer, COLORS } from '../../index'
import {
  cleanse,
  DATE_FORMATS,
  dateMaskByFormat,
  dateRegexByFormat,
  dateStringMatchesFormat,
} from './BirthdateInputValidator.js'

// Riffing off redux-form a bit: "this will be set when the field is blurred"
let touched = false;

const PrivateBirthdateInput = (props) => {
  const {
    minAge,
    maxAge,
    name,
    dateFormat,
    allCaps,
    labelCopy,
    validator,
    ...restProps } = props

  const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy')
  const [getError, setError, validate] = useErrorMessage(validator)

  const onBlur = (syntheticReactEvent) => {
    const cleansed =  cleanse(syntheticReactEvent.target.value)
    touched = true;

    // First check in valid format as that error takes priority
    let errMsg = dateStringMatchesFormat(cleansed, dateFormat);
    if (errMsg.length) {
      setError(errMsg)
    } else {
      // Now we let the validator validate the date range
      const conformedDate = dayjs(cleansed, dateFormat.toUpperCase())
      errMsg = validate(conformedDate)
      if (errMsg.length) {
        setError(errMsg)
      } else {
        // Passed all checks, reset error empty
        setError('')
      }
    }
  }

  const onChange = (syntheticReactEvent) => {
    if (!touched) return;
    const cleansed =  cleanse(syntheticReactEvent.target.value)
    const errMsg = dateStringMatchesFormat(cleansed, dateFormat);
    if (errMsg.length) {
      setError(errMsg)
    } else {
      setError('')
    }
  }

  return (
    <>
      <Caption.Medium500
        element='label'
        allCaps={allCaps}
        htmlFor={name}
        color={COLORS.GRAY_PRIMARY}
      >
        {labelCopy}
      </Caption.Medium500>
      <Spacer.H8 />
      <MaskedInput
        mask={dateMaskByFormat[dateFormat]}
        pipe={autoCorrectedDatePipe}
        className={!!getError() ? 'BirthdateInput TextInput Error' : 'BirthdateInput TextInput'}
        type='text'
        data-tid={restProps['data-tid']}
        guide={true}
        onBlur={onBlur}
        onChange={onChange}
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
  allCaps: PropTypes.bool,
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
