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
    ...restProps
  } = props

  const [getError, setError, validate] = useErrorMessage(validator)
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)
  const [doValidation] = useInputValidation({validate, setError, formChangeHandler})

  /**
   * We have to handle case where consumer does not pass in a validator and
   * only call in to validation if appropriate (maybe they do their own validation)
   */
  const attemptValidation = (value, isTouched) => {
    if (props.onChange) return
    doValidation(value, isTouched)
  }

  const onChange = (ev) => {
    const val = event.target.value
    const restrictedVal = restrict(val)
    setValue(restrictedVal)

    // Used to remove mask characters e.g. abc___ becomes just abc
    const cleansed = cleanse(restrictedVal)

    attemptValidation(cleansed, touched)
  }

  const onBlur = (ev) => {
    // We set touched to change the react state, but it's async and
    // processing still, so, we use a flag for doValidation
    setTouched(true)
    const val = ev.target.value
    const cleansed = cleanse(val)
    attemptValidation(cleansed, true)
  }

  // Prioritizes prop callbacks, but falls back to internal implementation
  const whichOnBlur = props.onBlur ? props.onBlur : onBlur
  const whichOnChange = props.onChange ? props.onChange : onChange

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
        mask={restProps.mask}
        type={restProps.type}
        data-tid={restProps['data-tid']}
        guide={restProps.guide}
        onBlur={whichOnBlur}
        onChange={whichOnChange}
        name={props.name}
        placeholder={restProps.placeholder}
        className={getClasses()}
        disabled={restProps.disabled}
        keepCharPositions={restProps.keepCharPositions}
      />
      {getError()}
    </>
  )
}

TextMaskedInput.PUBLIC_PROPS = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  mask: PropTypes.array.isRequired,
  guide: PropTypes.bool,
  keepCharPositions: PropTypes.bool,
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

