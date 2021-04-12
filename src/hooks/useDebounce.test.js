import useDebounce from './useDebounce'
import { renderHook, act, cleanup } from '@testing-library/react-hooks'

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

    // flag is initially off
    expect(result.current.isDebounced).toBe(false)

    // flag is on after triggering fn
    act(() => {
      result.current.debouncedFn()
    })
    expect(result.current.isDebounced).toBe(true)

    // flag is on during debounce duration
    act(() => {
      jest.advanceTimersByTime(99)
    })
    expect(result.current.isDebounced).toBe(true)

    // flag is off after debounce duration
    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current.isDebounced).toBe(false)
  })

  test('the debounced function can only be retriggered after specified duration', () => {
    // render the debounced function
    let { result } = renderHook(() => useDebounce(mockFn, mockDurationMs))

    // trigger the function once
    act(() => {
      result.current.debouncedFn()
    })
    expect(mockFn).toHaveBeenCalledTimes(1)

    // function wont be invoked during duration
    act(() => {
      result.current.debouncedFn()
    })
    expect(mockFn).toHaveBeenCalledTimes(1)

    // forward timers
    act(() => {
      jest.runAllTimers()
    })
    expect(mockFn).toHaveBeenCalledTimes(1)

    // function can be invoked after duration
    act(() => {
      result.current.debouncedFn()
    })
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  test('the target function is not debounced when duration is 0', () => {
    // render the non debounced function
    let { result } = renderHook(() => useDebounce(mockFn, 0))

    // function can be immediately invoked
    act(() => {
      result.current.debouncedFn()
      result.current.debouncedFn()
    })
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  test('the target function is called with passed in parameters', () => {
    // render the debounced function
    let { result } = renderHook(() => useDebounce(mockFn, mockDurationMs))

    // invoke function with params
    const mockParams = { a: 'aaa', b: 'bbb' }
    act(() => {
      result.current.debouncedFn(mockParams)
    })
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(mockParams)
  })

  test('when fn is not a function, or undefined.... what hsoule happen', () => {
    let test1 = renderHook(() => useDebounce(undefined, mockDurationMs))
    expect(test1.result.current.debouncedFn).toBe(undefined)

    let test2 = renderHook(() => useDebounce(123, mockDurationMs))
    expect(test2.result.current.debouncedFn).toBe(123)
  })
})
