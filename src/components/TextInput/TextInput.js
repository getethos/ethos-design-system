import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { InputLabel } from '../InputLabel'
import useRequired from '../../hooks/useRequired.js'
import useErrorMessage from '../../hooks/useErrorMessage.js'
import useInvalid from '../../hooks/useInvalid.js'
import useInputValidation from '../../hooks/useInputValidation.js'
import restrict from '../../helpers/restrict.js'
import styles from './TextInput.module.scss'
import errorStyles from '../Errors.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { VALID_ICONS } from '../../helpers/constants'

/**
 * @param type
 * @param  {string}   name        Input name and htmlFor prop for label
 * @param  {string}   labelCopy   User-visible text of label for input
 * @param  {boolean}  allCaps     Whether to text-trasform: uppercase
 * @param  {Function} validator   Function for validating input
 * @param  {boolean}  disabled
 * @param capitalize
 * @param formChangeHandler
 * @param initialValue
 * @param currentValue
 * @param currentError
 * @param setFieldTouched
 * @param restrictIllegal
 * @param  {string}   autoComplete  Autocomplete label
 * @param {string} [classOverrides]
 * @param {string} [labelColor]
 * @param {string} [labelWeight]
 * @param {string} [labelClasses]
 * @param rest
 */

function PrivateTextInput({
  type,
  disabled,
  name,
  labelCopy,
  allCaps,
  capitalize,
  formChangeHandler,
  validator,
  initialValue,
  currentValue,
  currentError,
  setFieldTouched,
  restrictIllegal,
  autoComplete,
  classOverrides,
  labelColor,
  labelWeight,
  labelClasses,
  icon,
  ...rest
}) {
  // Verify that all required props were supplied
  const [includesRequired] = useRequired(['data-tid', 'name'])
  let allRelevantProps = Object.assign({}, rest, {
    name: name,
    allCaps: allCaps,
    capitalize: capitalize,
  })
  includesRequired(allRelevantProps)

  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(
    Object.keys(PrivateTextInput.PUBLIC_PROPS)
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
      doValidation(initialValue, true)
    }
  }, [])

  const onBlur = (ev) => {
    setAllTouched()
    doValidation(ev.target.value, true)
  }

  const getClasses = () => {
    let returnClasses

    if (getError(currentError, touched)) {
      returnClasses = `${styles.TextInputCommon} ${errorStyles.Error}`
    } else if (classOverrides) {
      returnClasses = `${styles.TextInputCommon} ${classOverrides}`
    } else {
      returnClasses = `${styles.TextInputCommon} ${styles.TextInputStylable}`
    }
    // hasIcon class indicates the text input has icon, to give more padding-right in stylings,to prevent overlapping between icon and long input
    if (Object.keys(VALID_ICONS).includes(icon)) {
      returnClasses += ` ${styles.hasIcon}`
    }
    return returnClasses
  }

  return (
    <>
      {labelCopy && (
        <InputLabel
          name={name}
          labelCopy={labelCopy}
          labelColor={labelColor}
          labelWeight={labelWeight}
          labelClasses={labelClasses}
          allCaps={allCaps}
          capitalize={capitalize}
        />
      )}
      <div className={styles.TextInputWrapper}>
        <input
          type={type}
          className={getClasses()}
          disabled={disabled}
          name={name}
          placeholder={rest.placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          maxLength={rest.maxLength}
          data-tid={rest['data-tid']}
          aria-label={name} // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute
          autoComplete={autoComplete}
        />
        {Object.keys(VALID_ICONS).includes(icon) && (
          <div className={styles.TextInputIconWrapper}>
            <FontAwesomeIcon
              icon={[VALID_ICONS[icon].prefix, VALID_ICONS[icon].name]}
              className={styles.TextInputIcon}
            />
          </div>
        )}
      </div>
      {getError(currentError, touched)}
    </>
  )
}

PrivateTextInput.PUBLIC_PROPS = {
  type: PropTypes.string,
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  allCaps: PropTypes.bool,
  maxLength: PropTypes.number,
  /** text transform capitalize label */
  capitalize: PropTypes.bool,
  initialValue: PropTypes.string,
  labelCopy: PropTypes.string,
  labelColor: PropTypes.string,
  labelWeight: PropTypes.string,
  labelClasses: PropTypes.string,
  validator: PropTypes.func,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  restrictIllegal: PropTypes.bool,
  autoComplete: PropTypes.string,
  classOverrides: PropTypes.string,
  /** iconPrefix and iconName work together to render icon in input. Please refer to https://fontawesome.com/v5/docs/apis/javascript/import-icons for more information about iconPrefix. Please refer to `fa.js` and https://fontawesome.com for more info about icon's name. Currently allowed icons are defined by VALID_ICONS at src/helpers/constants.js */
  icon: PropTypes.oneOf(Object.keys(VALID_ICONS)),
}

PrivateTextInput.propTypes = {
  ...PrivateTextInput.PUBLIC_PROPS,
  /** text transform capitalize label */
  capitalize: PropTypes.bool,
  /** iconPrefix and iconName work together to render icon in input. Please refer to https://fontawesome.com/v5/docs/apis/javascript/import-icons for more information about iconPrefix. Please refer to `fa.js` and https://fontawesome.com for more info about icon's name. Currently allowed icons are defined by VALID_ICONS at src/helpers/constants.js */
  icon: PropTypes.oneOf(Object.keys(VALID_ICONS)),
}

PrivateTextInput.defaultProps = {
  type: 'text',
  placeholder: '',
  restrictIllegal: true,
}

function TextInputFactory(privateProps) {
  const PublicTextInputComponent = (downstreamProps) => {
    return <PrivateTextInput {...downstreamProps} {...privateProps} />
  }

  return PublicTextInputComponent
}

export const TextInput = TextInputFactory()
