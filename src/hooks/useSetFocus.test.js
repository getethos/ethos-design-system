import { renderHook } from '@testing-library/react-hooks'
import useSetFocus from './useSetFocus'
import { act } from '@testing-library/react'
import { useState } from 'react'

describe('useSetFocus', () => {
  it('should set focus on the passed ref when active', () => {
    const elem = document.createElement('button')

    const elemRef = { current: elem }
    renderHook(() => useSetFocus(elemRef, true))

    expect(document.activeElement).toBe(elem)
  })

  it('should return focus to the last active element when deactivated', () => {
    const elem = document.createElement('button')

    const elemRef = { current: elem }

    renderHook(() => {
      const [isActive, setIsActive] = useState(false)

      useSetFocus(elemRef, isActive)
      act(() => setIsActive(false))

      expect(document.activeElement).toBe(document.body)
    })

  })
})
