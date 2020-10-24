import * as React from 'react'
import { PublicFormProps } from '../../../components/Form/Form'
import { RadioButtonGroup } from '../../../components/index'
import styles from './NoraRadioButtonGroup.module.scss'

type NoraRadioButtonGroupProps = PublicFormProps & {
  options: any[]
  onChange?: (...args: any[]) => any
  initialValue?: string | boolean
  currentValue?: string
  currentError?: string
  disabled?: boolean
  required?: boolean
}
export const NoraRadioButtonGroup: React.SFC<NoraRadioButtonGroupProps> = ({
  name,
  options,
  onChange,
  formChangeHandler,
  initialValue = undefined,
  currentValue,
  currentError,
  formTouched,
  disabled,
  validator,
  required,
}) => {
  return (
    <div className={styles.NoraRadioButtonGroup}>
      <RadioButtonGroup
        name={name}
        labelCopy=""
        options={options}
        onChange={onChange}
        formChangeHandler={formChangeHandler}
        initialValue={initialValue}
        currentValue={currentValue}
        currentError={currentError}
        formTouched={formTouched}
        disabled={disabled}
        validator={validator}
        required={required}
      />
    </div>
  )
}
