import React from 'react'
import PropTypes from 'prop-types'
// https://github.com/text-mask/text-mask/tree/master/addons
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { TextMaskedInput } from '../TextMaskedInput'

export const integerMask = createNumberMask({
  allowDecimal: false,
  allowLeadingZeroes: false,
  guide: false,
  includeThousandsSeparator: true,
  prefix: '',
})

export const NumberInput = (props) => {
  const {
    name,
    type,
    mask,
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
      />
    </>
  )
}

NumberInput.propTypes = {
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  /** text transform capitalize label */
  capitalize: PropTypes.bool,
  currentValue: PropTypes.string,
  currentError: PropTypes.string,
  placeholder: PropTypes.string,
  formChangeHandler: PropTypes.func,
  setFieldTouched: PropTypes.func,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  initialValue: PropTypes.string,
  type: PropTypes.oneOf(['tel', 'number']),
  mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  placeholderChar: PropTypes.string,
}

NumberInput.defaultProps = {
  type: 'tel',
  mask: integerMask,
}
