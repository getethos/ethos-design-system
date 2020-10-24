import * as React from 'react'
import { PublicFormProps } from '../../../components/Form/Form'
import { CheckboxInput } from '../../../components/index'
import { Facade } from './Facade'
import styles from './NoraCheckboxInput.module.scss'
type NoraCheckboxInputProps = PublicFormProps & {
  initialValue?: string | boolean
  checked?: boolean
  disabled?: boolean
}
export const NoraCheckboxInput: React.FC<NoraCheckboxInputProps> = ({
  validator,
  children,
  name,
  initialValue,
  checked,
  disabled,
  ...rest
}) => {
  const renderFacade = (klasses) => <Facade classes={klasses} />
  return (
    <div className={styles.NoraCheckboxInput}>
      <CheckboxInput
        initialValue={initialValue}
        name={name}
        data-tid={rest['data-tid']}
        validator={validator}
        facadeRenderer={renderFacade}
        disabled={disabled}
        checked={checked}
        {...rest}
      >
        {children}
      </CheckboxInput>
    </div>
  )
}
