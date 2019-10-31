import { useFormState } from './useFormState.js'
import testHook from './testHook.js'

describe('useFormState hook', () => {
  test('defaults', () => {
    const initialState = { buttonGroup: '', buttonGroup2: '' }
    testHook(() => {
      const [
        ,
        ,
        getFieldErrorsString,
        getFieldErrors,
        getFieldValues,
        ,
        ,
        ,
        getFormIsValid,
        ,
        ,
      ] = useFormState(initialState)
      expect(getFieldErrorsString()).toEqual('')
      expect(getFieldErrors()).toEqual(initialState)
      expect(getFieldValues()).toEqual(initialState)
      expect(getFormIsValid()).toBeFalsy()
    })
  })

  test('fields with errors', () => {
    const initialState = { buttonGroup: 'error1', buttonGroup2: 'error2' }
    testHook(() => {
      const [
        ,
        ,
        getFieldErrorsString,
        getFieldErrors,
        getFieldValues,
        ,
        ,
        ,
        getFormIsValid,
        ,
        ,
      ] = useFormState(initialState)
      expect(getFieldErrorsString()).toEqual('error1, error2')
      expect(getFieldErrors()).toEqual(initialState)
      expect(getFieldValues()).toEqual(initialState)
      expect(getFormIsValid()).toBeFalsy()
    })
  })

  test('hidden fields', () => {
    const initialState = { buttonGroup: 'error1', buttonGroup2: 'error2' }
    testHook(() => {
      const [
        ,
        ,
        getFieldErrorsString,
        getFieldErrors,
        getFieldValues,
        ,
        ,
        ,
        getFormIsValid,
        ,
        setFieldsHidden,
      ] = useFormState(initialState)
      setFieldsHidden('buttonGroup2', true)
      expect(getFieldErrorsString()).toEqual('error1')
      expect(getFieldErrors()).toEqual({ buttonGroup: 'error1' })
      expect(getFieldValues()).toEqual({ buttonGroup: 'error1' })
      expect(getFormIsValid()).toBeFalsy()
    })
  })
})
