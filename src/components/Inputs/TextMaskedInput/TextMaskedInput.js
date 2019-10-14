import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import useErrorMessage from '../../../hooks/useErrorMessage.js'
import useInputValidation from '../../../hooks/useInputValidation.js'
import restrict from '../../../helpers/restrict.js'
import { InputLabel } from '../InputLabel'
import { cleanse } from '../../../validators/BirthdateInputValidator'

import styles from '../TextInput/TextInput.module.scss'
import errorStyles from '../Errors.module.scss'

export const TextMaskedInput = (props) => {
  const {
    name,
    labelCopy,
    allCaps,
    validator,
    formChangeHandler,
    initialValue,
    doValidation,
    ...restProps
  } = props

  const [getError, setError, validate] = useErrorMessage(validator)
  const [value, setValue] = useState(initialValue || '')
  const [touched, setTouched] = useState(initialValue ? true : false)
  const [internalDoValidation] = useInputValidation({validate, setError, formChangeHandler})

  // Prioritizes props.doValidation but falls back to our internal implementation
  const whichDoValidation = props.doValidation ? props.doValidation : internalDoValidation 

  const onChange = (ev) => {
    const val = event.target.value
    const restrictedVal = restrict(val)
    setValue(restrictedVal)

    // Used to remove mask characters e.g. abc___ becomes just abc
    const cleansed = cleanse(restrictedVal)

    whichDoValidation(cleansed, touched)
  }

  const onBlur = (ev) => {
    // We set touched to change the react state, but it's async and
    // processing still, so, we use a flag for doValidation
    setTouched(true)
    const val = ev.target.value
    const cleansed = cleanse(val)
    whichDoValidation(cleansed, true)
  }

  const onPaste = (ev) => {
    const val = ev.clipboardData.getData('text/plain')
    const restrictedVal = restrict(val)
    // Used to remove mask characters e.g. abc___ becomes just abc
    const cleansed = cleanse(restrictedVal)
    setValue(cleansed)
  }

  const getClasses = () => {
    return !!getError() ?
      `TextMaskedInput ${styles.TextInput} ${errorStyles.Error}` :
      `TextMaskedInput ${styles.TextInput}`
  }

  return (
    <>
      <InputLabel name={name} labelCopy={labelCopy} allCaps={allCaps} />
      <MaskedInput
        value={value}
        mask={restProps.mask}
        type={restProps.type}
        data-tid={restProps['data-tid']}
        guide={restProps.guide}
        onChange={onChange}
        onBlur={onBlur}
        onPaste={onPaste}
        name={props.name}
        placeholder={restProps.placeholder}
        className={getClasses()}
        disabled={restProps.disabled}
        keepCharPositions={restProps.keepCharPositions}
        pipe={restProps.pipe}
      />
      {getError()}
    </>
  )
}

TextMaskedInput.PUBLIC_PROPS = {
  doValidation: PropTypes.func,
  placeholder: PropTypes.string,
  mask: PropTypes.array.isRequired,
  guide: PropTypes.bool,
  initialValue: PropTypes.string,
  keepCharPositions: PropTypes.bool,
  pipe: PropTypes.func,
  type: PropTypes.string.isRequired,
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
}

TextMaskedInput.propTypes = {
  ...TextMaskedInput.PUBLIC_PROPS,
}

TextMaskedInput.defaultProps = {
  placeholder: '',
  guide: true,
  keepCharPositions: true,
  disabled: false,
  allCaps: false,
}

