import useDebounce from './useDebounce'
import { renderHook, act } from '@testing-library/react-hooks'

describe('useDebounce hook', () => {
  let mockFn
  let mockDurationMs

  beforeEach(() => {
    jest.useFakeTimers()

    mockFn = jest.fn()
    mockDurationMs = 100
  })

  afterEach(() => {
    mockFn.mockClear()
    jest.useRealTimers()
  })

  test('the debounce flag is set correctly', () => {
    // render the debounced function
    let { result } = renderHook(() => useDebounce(mockFn, mockDurationMs))

    // isDebounced flag is initially off
    expect(result.current[0]).toBe(false)

    // flag is on after triggering fn
    act(() => {
      result.current[1]() // debouncedFn()
    })
    expect(result.current[0]).toBe(true)

    // flag is on during debounce duration
    act(() => {
      jest.advanceTimersByTime(99)
    })
    expect(result.current[0]).toBe(true)

    // flag is off after debounce duration
    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current[0]).toBe(false)
  })

  test('the target function is not debounced when duration is 0', () => {
    // render the non debounced function
    let { result } = renderHook(() => useDebounce(mockFn, 0))

    // function can be immediately invoked
    act(() => {
      result.current[1]() // debouncedFn()
      result.current[1]() // debouncedFn()
    })
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  test('the target function is called with passed in parameters', () => {
    // render the debounced function
    let { result } = renderHook(() => useDebounce(mockFn, mockDurationMs))

    // invoke function with params
    const mockParams = { a: 'aaa', b: 'bbb' }
    act(() => {
      result.current[1](mockParams) // debouncedFn()
    })
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(mockParams)
  })

  test('no errors when target function is not a function', () => {
    let test1 = renderHook(() => useDebounce(undefined, mockDurationMs))
    expect(test1.result.current[1]).toBe(undefined)

    let test2 = renderHook(() => useDebounce(123, mockDurationMs))
    expect(test2.result.current[1]).toBe(123)
  })
})
