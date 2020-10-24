import * as React from 'react'
// https://github.com/text-mask/text-mask/tree/master/addons
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { TextMaskedInput } from '../TextMaskedInput'
import { PublicFormProps } from '../Form/Form'
export const integerMask = createNumberMask({
  allowDecimal: false,
  allowLeadingZeroes: false,
  guide: false,
  includeThousandsSeparator: true,
  prefix: '',
})
type NumberInputProps = PublicFormProps & {
  disabled?: boolean
  allCaps?: boolean
  capitalize?: boolean
  currentValue?: string
  currentError?: string
  placeholder?: string
  labelCopy: string
  initialValue?: string
  type?: 'tel' | 'number'
  mask?: any[] | ((...args: any[]) => any)
  placeholderChar?: string
  guide?: boolean
  keepCharPositions?: boolean
}
export const NumberInput: React.SFC<NumberInputProps> = (props) => {
  const {
    name,
    type = 'tel',
    mask = integerMask,
    disabled,
    labelCopy,
    allCaps,
    capitalize,
    validator,
    formChangeHandler,
    initialValue,
    currentValue,
    currentError,
    placeholder,
    setFieldTouched,
    placeholderChar,
    guide = true,
    keepCharPositions = true,
    ...restProps
  } = props
  const internalMask = mask || integerMask
  return (
    <>
      <TextMaskedInput
        initialValue={initialValue}
        disabled={disabled}
        mask={internalMask}
        placeholder={placeholder}
        type={type}
        labelCopy={labelCopy}
        allCaps={allCaps}
        capitalize={capitalize}
        data-tid={restProps['data-tid']}
        name={name}
        currentValue={currentValue}
        currentError={currentError}
        setFieldTouched={setFieldTouched}
        validator={validator}
        formChangeHandler={formChangeHandler}
        placeholderChar={placeholderChar}
        guide={guide}
        keepCharPositions={keepCharPositions}
      />
    </>
  )
}
