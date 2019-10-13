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

  const onChange = (ev) => {
    const val = event.target.value
    const restrictedVal = restrict(val)
    setValue(restrictedVal)

    // Used to remove mask characters e.g. abc___ becomes just abc
    const cleansed = cleanse(restrictedVal)

    doValidation(cleansed, touched)
  }

  const onBlur = (ev) => {
    // We set touched to change the react state, but it's async and
    // processing still, so, we use a flag for doValidation
    setTouched(true)
    doValidation(ev.target.value, true)
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
        mask={props.mask}
        type={props.type}
        data-tid={restProps['data-tid']}
        guide={props.guide}
        onBlur={onBlur}
        onChange={onChange}
        name={props.name}
        className={getClasses()}
        disabled={props.disabled}
        keepCharPositions={props.keepCharPositions}
      />
      {getError()}
    </>
  )
}

TextMaskedInput.PUBLIC_PROPS = {
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
  guide: true,
  keepCharPositions: true,
  disabled: false,
  allCaps: false,
}

