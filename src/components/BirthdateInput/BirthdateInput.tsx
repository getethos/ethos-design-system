import * as React from 'react'
import { DateInput } from '../DateInput'
import { PublicFormProps } from '../Form/Form'
import * as Validators from '../../validators/BirthdateInputValidator'
const { DATE_FORMATS } = Validators
type BirthdateInputProps = PublicFormProps & {
  dateFormat?: any
  disabled?: boolean
  allCaps?: boolean
  capitalize?: boolean
  labelCopy?: string
  initialValue?: string
  currentValue?: string
  currentError?: string
}
export const BirthdateInput: React.SFC<BirthdateInputProps> = (props) => {
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
    ...restProps
  } = props
  return (
    <DateInput
      optional={optional}
      dateFormat={dateFormat}
      allCaps={allCaps}
      capitalize={capitalize}
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
export const BirthdateInputValidators = Validators
