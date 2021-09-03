import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import useErrorMessage from '../../hooks/useErrorMessage.js'
import useInputValidation from '../../hooks/useInputValidation.js'
import restrict from '../../helpers/restrict.js'
import { InputLabel } from '../InputLabel'
import cleanse from '../../helpers/cleanse.js'

import styles from '../TextInput/TextInput.module.scss'
import errorStyles from '../Errors.module.scss'

export const TextMaskedInput = (props) => {
  const {
    name,
    mask,
    labelCopy,
    allCaps,
    capitalize,
    validator,
    getTouched,
    setTouched,
    formChangeHandler,
    initialValue,
    currentValue,
    currentError,
    setFieldTouched,
    doValidation,
    placeholderChar,
    autoComplete,
    classOverrides,
    ...restProps
  } = props

  const val = currentValue || initialValue
  const [value, setValue] = useState(val || '')
  const [internalTouched, internalSetTouched] = useState(
    initialValue ? true : false
  )
  const whichTouched = getTouched ? getTouched : internalTouched
  const [getError, setError, , validate] = useErrorMessage(validator)
  const [internalDoValidation] = useInputValidation({
    validate,
    setError,
    formChangeHandler,
  })
  const whichDoValidation = doValidation ? doValidation : internalDoValidation

  // Initial Value aka prefilled—are considered "touched", but must prevalidate
  // which will in turn update the internal form state as to their validity
  useEffect(() => {
    if (!!formChangeHandler && initialValue) {
      const cleansed = cleanse(initialValue)
      whichDoValidation(cleansed, true)
    }
  }, [])

  const whichSetTouched = setTouched ? setTouched : internalSetTouched
  const setAllTouched = () => {
    whichSetTouched(true)
    if (setFieldTouched) {
      setFieldTouched(true)
    }
  }

  const onBlur = (ev) => {
    ev.persist()
    setTimeout(() => {
      // We set touched to change the react state, but it's async and
      // processing still, so, we use a flag for doValidation
      setAllTouched()
      const val = ev.target.value
      const cleansed = cleanse(val)
      whichDoValidation(cleansed, true)
    }, 100)
  }

  const onChange = (ev) => {
    const val = ev.target.value
    const restrictedVal = restrict(val)
    setValue(restrictedVal)

    // Used to remove mask characters e.g. abc___ becomes just abc
    const cleansed = cleanse(restrictedVal)

    whichDoValidation(cleansed, whichTouched)
  }

  const getClasses = () => {
    const base = `TextMaskedInput ${styles.TextInputCommon}`
    return getError(currentError, whichTouched)
      ? `${base} ${errorStyles.Error}`
      : classOverrides
      ? `${base} ${classOverrides}`
      : `${base} ${styles.TextInputStylable}`
  }

  const maskedInputProps = {
    value,
    mask,
    type: restProps.type,
    'data-tid': restProps['data-tid'],
    onChange,
    onBlur,
    name,
    placeholder: restProps.placeholder,
    className: getClasses(),
    disabled: restProps.disabled,
    placeholderChar,
    autoComplete,
  }

  if (typeof mask !== 'function') {
    maskedInputProps.guide = restProps.guide
    maskedInputProps.keepCharPositions = restProps.keepCharPositions
    maskedInputProps.pipe = restProps.pipe
  }

  return (
    <>
      <InputLabel
        name={name}
        labelCopy={labelCopy}
        labelColor={props.labelColor}
        labelWeight={props.labelWeight}
        labelClasses={props.labelClasses}
        allCaps={allCaps}
        capitalize={capitalize}
      />

      <MaskedInput {...maskedInputProps} />

      {!doValidation && getError(currentError, whichTouched)}
    </>
  )
}

TextMaskedInput.PUBLIC_PROPS = {
  doValidation: PropTypes.func,
  placeholder: PropTypes.string,
  mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
  guide: PropTypes.bool,
  initialValue: PropTypes.string,
  keepCharPositions: PropTypes.bool,
  pipe: PropTypes.func,
  type: PropTypes.string.isRequired,
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  /** text transform capitalize label */
  capitalize: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  setTouched: PropTypes.func,
  getTouched: PropTypes.bool,
  placeholderChar: PropTypes.string,
  autoComplete: PropTypes.string,
  classOverrides: PropTypes.string,
  labelColor: PropTypes.string,
  labelWeight: PropTypes.string,
  labelClasses: PropTypes.string,
}

TextMaskedInput.propTypes = {
  ...TextMaskedInput.PUBLIC_PROPS,
}

TextMaskedInput.defaultProps = {
  placeholder: '',
  guide: true,
  keepCharPositions: true,
  disabled: false,
  allCaps: true,
}
