import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { InputLabel } from '../InputLabel'
import { BaseTextAreaInput } from './BaseTextAreaInput'
import useRequired from '../../hooks/useRequired.js'
import useErrorMessage from '../../hooks/useErrorMessage.js'
import useInvalid from '../../hooks/useInvalid.js'
import useInputValidation from '../../hooks/useInputValidation.js'
import restrict from '../../helpers/restrict.js'
import styles from './TextAreaInput.module.scss'
import errorStyles from '../Errors.module.scss'

function PrivateTextAreaInput({
  resize,
  disabled,
  name,
  labelCopy,
  allCaps,
  capitalize,
  formChangeHandler,
  validator,
  placeholder = '',
  initialValue,
  currentValue,
  currentError,
  setFieldTouched,
  restrictIllegal = true,
  rows,
  ...rest
}) {
  // Verify that all required props were supplied
  const [includesRequired] = useRequired(['data-tid', 'name', 'labelCopy'])
  let allRelevantProps = Object.assign({}, rest, {
    name: name,
    labelCopy: labelCopy,
    allCaps: allCaps,
    capitalize: capitalize,
  })
  includesRequired(allRelevantProps)

  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(
    Object.keys(PrivateTextAreaInput.PUBLIC_PROPS)
  )
  includesInvalid(rest)

  // Set up validation hooks
  const [getError, setError, , validate] = useErrorMessage(validator)

  const [value, setValue] = useState(currentValue || initialValue || '')

  const [touched, setTouched] = useState(initialValue ? true : false)

  const [doValidation] = useInputValidation({
    validate,
    setError,
    formChangeHandler,
  })

  const onChange = (ev) => {
    const val = ev.target.value
    const restrictedVal = restrictIllegal ? restrict(val) : val
    setValue(restrictedVal)

    // We call setTouched in onBlur, so can reliably call getter here
    doValidation(restrictedVal, touched)
  }

  const setAllTouched = () => {
    // We set touched to change the react state, but it's async and
    // processing still, so, we use a flag for doValidation
    setTouched(true)
    // Also tell the form we've been touched
    if (setFieldTouched) {
      setFieldTouched(true)
    }
  }

  // Initial Value aka prefilled—are considered "touched", but must prevalidate
  // which will in turn update the internal form state as to their validity
  useEffect(() => {
    if (!!formChangeHandler && initialValue) {
      doValidation(initialValue, '')
    }
  }, [])

  const onBlur = (ev) => {
    setAllTouched()
    doValidation(ev.target.value, true)
  }

  const classes = [styles.TextAreaInput]
  if (getError(currentError, touched)) {
    classes.push(errorStyles.Error)
  }

  if (resize) {
    classes.push(styles.Resize)
  }

  return (
    <>
      <InputLabel
        name={name}
        labelCopy={labelCopy}
        allCaps={allCaps}
        capitalize={capitalize}
      />
      <BaseTextAreaInput
        className={classes.join(' ')}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        data-tid={rest['data-tid']}
        rows={rows}
      />
      {getError(currentError, touched)}
    </>
  )
}

PrivateTextAreaInput.PUBLIC_PROPS = {
  resize: PropTypes.bool,
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  allCaps: PropTypes.bool,
  rows: PropTypes.number,
  /** text transform capitalize label */
  capitalize: PropTypes.bool,
  formChangeHandler: PropTypes.func,
  currentValue: PropTypes.string,
  initialValue: PropTypes.string,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  placeholder: PropTypes.string,
  currentError: PropTypes.string,
  setFieldTouched: PropTypes.func,
  restrictIllegal: PropTypes.bool,
}

PrivateTextAreaInput.propTypes = {
  ...PrivateTextAreaInput.PUBLIC_PROPS,
}

function TextAreaInputFactory(privateProps) {
  const PublicTextAreaInputComponent = (downstreamProps) => {
    return <PrivateTextAreaInput {...downstreamProps} {...privateProps} />
  }

  return PublicTextAreaInputComponent
}

export const TextAreaInput = TextAreaInputFactory()
