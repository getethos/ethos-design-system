import React from 'react'

/**
 * Custom  hook for boiler-plate validation logic
 *
 * @prop {function} props.validate - required method returned from useErrorMessage
 * @prop {function} props.setError - required method returned from useErrorMessage
 * @prop {function} [props.formChangeHandler] - Optional callback thats fires after validation
 * @prop {function} [props.callErrorHandlers] - Optional and overrides callErrorHandlers implemented here
 * @prop {function} [props.setErrorWrapper] - Optional and overrides setErrorWrapper implemented here
 *
 * Examples

 In the simplest case to use the boiler-plate just import this hook and then do:
   const [doValidation] = useInputValidation({validate, setError, formChangeHandler})

 If you need to override doValidation, callErrorHandlers, or setErrorWrapper, do something like following:

  // 1. Define your override implementation:
  const callErrorHandlers = (value, handlerFn) => {
    let errMsg = myValidator(value)
    const errorMessage = errMsg.length ? errMsg : ''
    handlerFn(value, errorMessage)
  }

  // 2. Pass in your override implementation. Now, your custom callErrorHandlers will get called:
  const [doValidation] = useInputValidation({validate, setError, formChangeHandler, callErrorHandlers})
 */
const useInputValidation = ({
  validate,
  setError,
  formChangeHandler,
  callErrorHandlers,
  setErrorWrapper,
}) => {
  const setErrorWrapperInternal = setErrorWrapper ? setErrorWrapper : (value, errorValue) => {
    if (!!formChangeHandler) {
      formChangeHandler(value, errorValue)
    }
    setError(errorValue)
  }

  const callErrorHandlersInternal = callErrorHandlers ? callErrorHandlers : (value, handlerFn) => {
    let errorMessage = validate(value)
    errorMessage = errorMessage.length ? errorMessage : ''
    handlerFn(value, errorMessage)
  }

  const doValidation = (value, isTouched) => {
    // User hasn't blurred but we still need to inform form
    // engine if we're in a valid state or not
    if (!isTouched && !!formChangeHandler) {
      callErrorHandlersInternal(value, formChangeHandler)
    } else {
      // Have blurred
      callErrorHandlersInternal(value, setErrorWrapperInternal)
    }
  }

  return [doValidation]
}

export default useInputValidation
