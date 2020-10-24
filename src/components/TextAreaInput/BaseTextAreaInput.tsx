import * as React from 'react'
import { PublicFormProps } from '../Form/Form'
type BaseTextAreaInputProps = PublicFormProps & {
  className?: string
  disabled?: boolean
  placeholder?: string
  onPaste?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onChange?: (...args: any[]) => any
  value?: string
}
/**
 * @private
 *
 * Required props:
 * @param {string} name
 * @param {string} 'data-tid'
 */
export const BaseTextAreaInput: React.FC<BaseTextAreaInputProps> = ({
  className,
  disabled,
  name,
  placeholder,
  onPaste,
  onBlur,
  onFocus,
  onChange,
  value,
  ...rest
}) => {
  return (
    <textarea
      className={className}
      disabled={disabled}
      name={name}
      placeholder={placeholder}
      onPaste={onPaste}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      data-tid={rest['data-tid']}
    />
  )
}
