import React from 'react'
import PropTypes from 'prop-types'
// https://github.com/text-mask/text-mask/tree/master/addons
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { TextMaskedInput } from '../TextMaskedInput'
import { VALID_ICONS } from '../../helpers/constants'

export const integerMask = createNumberMask({
  allowDecimal: false,
  allowLeadingZeroes: false,
  guide: false,
  includeThousandsSeparator: true,
  prefix: '',
})

export const NumberInput = ({
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
  autoComplete,
  maxLength,
  icon,
  classOverrides,
  labelWeight,
  labelColor,
  ...restProps
}) => {
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
        autoComplete={autoComplete}
        maxLength={maxLength}
        icon={icon}
        classOverrides={classOverrides}
        labelWeight={labelWeight}
        labelColor={labelColor}
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
  guide: PropTypes.bool,
  keepCharPositions: PropTypes.bool,
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
  /** iconPrefix and iconName work together to render icon in input. Please refer to https://fontawesome.com/v5/docs/apis/javascript/import-icons for more information about iconPrefix. Please refer to `fa.js` and https://fontawesome.com for more info about icon's name. Currently allowed icons are defined by VALID_ICONS at src/helpers/constants.js */
  icon: PropTypes.oneOf(Object.keys(VALID_ICONS)),
  /** passed down through component to override Inputstyles */
  classOverrides: PropTypes.string,
  /** passed down through component to override label weight */
  labelWeight: PropTypes.string,
  /** passed down through component to override label color */
  labelColor: PropTypes.string,
}
