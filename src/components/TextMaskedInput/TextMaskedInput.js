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
    ...restProps
  } = props

  const [getError, setError, , validate] = useErrorMessage(validator)
  const val = currentValue || initialValue
  const [value, setValue] = useState(val || '')
  const [internalTouched, internalSetTouched] = useState(
    initialValue ? true : false
  )
  const whichTouched = getTouched ? getTouched : internalTouched
  const whichSetTouched = setTouched ? setTouched : internalSetTouched
  const [internalDoValidation] = useInputValidation({
    validate,
    setError,
    formChangeHandler,
  })
  const whichDoValidation = doValidation ? doValidation : internalDoValidation

  const onChange = (ev) => {
    const val = ev.target.value
    const restrictedVal = restrict(val)
    setValue(restrictedVal)

    // Used to remove mask characters e.g. abc___ becomes just abc
    const cleansed = cleanse(restrictedVal)

    whichDoValidation(cleansed, whichTouched)
  }

  const setAllTouched = () => {
    whichSetTouched(true)
    if (setFieldTouched) {
      setFieldTouched(true)
    }
  }

  // Initial Value aka prefilled—are considered "touched", but must prevalidate
  // which will in turn update the internal form state as to their validity
  useEffect(() => {
    if (!!formChangeHandler && initialValue) {
      const cleansed = cleanse(initialValue)
      whichDoValidation(cleansed, true)
    }
  }, [])

  const onBlur = (ev) => {
    // We set touched to change the react state, but it's async and
    // processing still, so, we use a flag for doValidation
    setAllTouched()
    const val = ev.target.value
    const cleansed = cleanse(val)
    whichDoValidation(cleansed, true)
  }

  const getClasses = () => {
    return getError(currentError, whichTouched)
      ? `TextMaskedInput ${styles.TextInput} ${errorStyles.Error}`
      : `TextMaskedInput ${styles.TextInput}`
  }

  const getMaskedInputByType = (mask) => {
    if (typeof mask === 'function') {
      return (
        <MaskedInput
          value={value}
          mask={mask}
          type={restProps.type}
          data-tid={restProps['data-tid']}
          onChange={onChange}
          onBlur={() => setTimeout(onBlur, 100)}
          name={props.name}
          placeholder={restProps.placeholder}
          className={getClasses()}
          disabled={restProps.disabled}
          placeholderChar={placeholderChar}
        />
      )
    } else {
      return (
        <MaskedInput
          value={value}
          mask={mask}
          type={restProps.type}
          data-tid={restProps['data-tid']}
          guide={restProps.guide}
          onChange={onChange}
          onBlur={() => setTimeout(onBlur, 100)}
          name={props.name}
          placeholder={restProps.placeholder}
          className={getClasses()}
          disabled={restProps.disabled}
          keepCharPositions={restProps.keepCharPositions}
          pipe={restProps.pipe}
          placeholderChar={placeholderChar}
        />
      )
    }
  }

  return (
    <>
      <InputLabel
        name={name}
        labelCopy={labelCopy}
        allCaps={allCaps}
        capitalize={capitalize}
      />
      {getMaskedInputByType(mask)}
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
