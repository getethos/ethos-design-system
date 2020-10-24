import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useEffect, useState } from 'react'
import useErrorMessage from '../../hooks/useErrorMessage'
import useInputValidation from '../../hooks/useInputValidation'
import zipInputValidator from '../../validators/ZipInputValidator'
import { PublicFormProps } from '../Form/Form'
import { TextMaskedInput } from '../TextMaskedInput'
const PUBLIC_PROPS = {
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  /** text transform capitalize label */
  capitalize: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
  initialValue: PropTypes.string,
  guide: PropTypes.bool,
  keepCharPositions: PropTypes.bool,
}
type ZipInputProps = PublicFormProps & {
  disabled?: boolean
  allCaps?: boolean
  capitalize?: boolean
  labelCopy: string
  initialValue?: string
  guide?: boolean
  keepCharPositions?: boolean
  placeholder?: string
  pipe?: any
}
export const ZipInput: React.FC<ZipInputProps> & {
  PUBLIC_PROPS: typeof PUBLIC_PROPS
} = (props) => {
  const {
    name,
    labelCopy,
    allCaps,
    capitalize,
    validator,
    formChangeHandler,
    initialValue,
    currentValue,
    currentError,
    formTouched,
    guide = true,
    keepCharPositions = true,
    ...restProps
  } = props
  const [getError, setError, , validate] = useErrorMessage(validator)
  const val = currentValue || initialValue
  const [touched, setTouched] = useState(initialValue ? true : false)
  const [value] = useState(val || '')
  // This has to come before useInputValidation setup below
  const callErrorHandlers = (value, handlerFn) => {
    /// Check zip format validity
    let errMsg = zipInputValidator(value)
    const errorMessage = errMsg.length ? errMsg : ''
    if (errorMessage.length) {
      handlerFn(value, errorMessage)
    } else {
      // Call any addtional validators the consumer has setup
      // Note if no validators, we're still safe as validate checks
      let errorMessage = validate(value)
      errorMessage =
        (typeof errorMessage === 'string' || Array.isArray(errorMessage)) &&
        errorMessage.length
          ? errorMessage
          : ''
      handlerFn(value, errorMessage)
    }
  }
  useEffect(() => {
    if (!!formChangeHandler && initialValue) {
      formChangeHandler(initialValue, '')
    }
  }, [])
  const [doValidation] = useInputValidation({
    validate,
    setError,
    formChangeHandler,
    callErrorHandlers,
  })
  return (
    <>
      <TextMaskedInput
        initialValue={value}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
        pipe={props.pipe}
        placeholder={props.placeholder}
        type="tel"
        labelCopy={labelCopy}
        allCaps={allCaps}
        capitalize={capitalize}
        data-tid={restProps['data-tid']}
        guide={guide}
        doValidation={doValidation}
        name={name}
        keepCharPositions={keepCharPositions}
        currentValue={currentValue}
        currentError={currentError}
        formTouched={formTouched}
        setFieldTouched={restProps.setFieldTouched}
        getTouched={touched}
        setTouched={setTouched}
      />
      {getError(currentError, touched)}
    </>
  )
}
ZipInput.PUBLIC_PROPS = PUBLIC_PROPS
