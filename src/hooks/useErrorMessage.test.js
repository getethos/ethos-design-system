import useErrorMessage from './useErrorMessage.js'
import testHook from './testHook.js'

describe('useErrorMessage hook', () => {
  test('validate callback', () => {
    const validatorMock = jest.fn().mockReturnValue('problemo')
    testHook(() => {
      const [, , , validate] = useErrorMessage(validatorMock)
      validate('foo')
      expect(validatorMock.mock.calls.length).toBe(1)
      expect(validatorMock.mock.calls[0][0]).toBe('foo')
      expect(validatorMock.mock.results[0].value).toBe('problemo')
    })
  })

  test('other hook methods exist', () => {
    const validatorMock = jest.fn().mockReturnValue('problemo')
    testHook(() => {
      const [getError, setError] = useErrorMessage(validatorMock)
      expect(typeof getError).toEqual('function')
      expect(typeof setError).toEqual('function')
    })
  })
})
