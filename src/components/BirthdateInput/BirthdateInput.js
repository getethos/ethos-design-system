import React from 'react'
import PropTypes from 'prop-types'
import { DateInput } from '../DateInput'
import * as Validators from '../../validators/BirthdateInputValidator'
const { DATE_FORMATS } = Validators

export const BirthdateInput = (props) => {
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

  return (
    <DateInput
      optional={optional}
      dateFormat={dateFormat}
      allCaps={allCaps}
      labelCopy={labelCopy}
      validator={validator}
      formChangeHandler={formChangeHandler}
      initialValue={initialValue}
      currentValue={currentValue}
      currentError={currentError}
      formTouched={formTouched}
      setFieldTouched={setFieldTouched}
      {...restProps}
    />
  )
}

BirthdateInput.propTypes = {
  /** whether this field is optional or not */
  optional: PropTypes.bool,
  /** Date format -- one of: 'mm/dd/yyyy', 'mm/yyyy', 'mm/yy' */
  dateFormat: PropTypes.oneOf(DATE_FORMATS),
  /** Required data-tid used as a unique id for targeting test selectors */
  'data-tid': PropTypes.string,
  /** whether disabled or not */
  disabled: PropTypes.bool,
  /** whether to display label in all caps */
  allCaps: PropTypes.bool,
  /** Name of the field */
  name: PropTypes.string.isRequired,
  /** label  */
  labelCopy: PropTypes.string,
  /** field validation callback */
  validator: PropTypes.func,
  /** Optionally sets a default value for the birthdate */
  initialValue: PropTypes.string,
  /** low level prop used only by the form engine */
  formTouched: PropTypes.bool,
  /** currentValue is a low level prop used only by the form engine */
  currentValue: PropTypes.string,
  /** setFieldTouched is a low level prop used only by the form engine */
  setFieldTouched: PropTypes.func,
  /** currentError is a low level prop used only by the form engine */
  currentError: PropTypes.string,
  /** formChangeHandler is a low level prop used only by the form engine */
  formChangeHandler: PropTypes.func,
}

export const BirthdateInputValidators = Validators
