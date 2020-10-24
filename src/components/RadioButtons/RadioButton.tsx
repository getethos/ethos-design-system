import * as React from 'react'
import { useEffect, useRef } from 'react'
import useIncludes from '../../hooks/useIncludes.js'
import { Body } from '../Body.js'
import { COLORS } from '../Colors.js'
import { PublicFormProps } from '../Form/Form'
import styles from './RadioButtons.module.scss'
// Wrapping this way facilitates spying with spyOn
export const focusHelper = {
  focus: (elementRef) => {
    elementRef.current?.focus()
  },
}
export type RadioButtonProps = PublicFormProps & {
  value: string
  checked?: boolean
  tabIndex?: number
  required?: boolean
  disabled?: boolean
  label: React.ReactNode
  onClick?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onChange?: (...args: any[]) => any
  onDragStart?: (...args: any[]) => any
  onDrop?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
}
export const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  value,
  checked,
  tabIndex,
  required,
  disabled,
  label,
  onClick,
  onChange,
  ...rest
}) => {
  const [, includesKeysOrThrow] = useIncludes(['name', 'label'])
  includesKeysOrThrow({ name, label })
  const spanRadio = useRef(null)
  // This allows the user to arrow navigate within radio group preserving focus affordance
  useEffect(() => {
    if (checked) {
      focusHelper.focus(spanRadio)
    }
  }, [checked])
  return (
    <label className={styles.RadioButton}>
      <span
        role="radio"
        ref={spanRadio}
        aria-checked={checked}
        tabIndex={tabIndex}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onClick={onClick}
          onChange={onChange}
          required={required}
          disabled={disabled}
          data-tid={rest['data-tid']}
        />
        <aside />
      </span>
      <Body.Regular400 color={COLORS.GRAY_PRIMARY}>{label}</Body.Regular400>
    </label>
  )
}
