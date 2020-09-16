import { renderHook } from '@testing-library/react-hooks'
import useSetFocus from './useSetFocus'

describe('useSetFocus', () => {
  it('should set focus on the passed ref when active', () => {
    const elem = document.createElement('button')

    const elemRef = { current: elem }
    renderHook(() => useSetFocus(elemRef, true))

    expect(document.activeElement).toBe(elem)
  })
})
