import { renderHook } from '@testing-library/react-hooks'
import useOutsideClickIgnoreSelectors from './useOutsideClickIgnoreSelectors'
import { act, fireEvent } from '@testing-library/react'

describe('useOutsideClickIgnoreSelectors', () => {
  it('should fire handler when outside click captured on element that is not the ref or ignored', () => {
    const refEl = document.createElement('div')
    const ref = { current: refEl }
    document.body.appendChild(refEl)

    let ignoredElement = document.createElement('div')
    ignoredElement.setAttribute('id', 'el1')
    document.body.appendChild(ignoredElement)

    let notIgnoredElement = document.createElement('div')
    document.body.appendChild(notIgnoredElement)

    const handler = jest.fn()

    renderHook(() => useOutsideClickIgnoreSelectors(ref, ['#el1'], handler))

    act(() => {
      fireEvent.mouseDown(notIgnoredElement)
    })

    expect(handler).toHaveBeenCalled()
  })

  it('should not fire handler when outside click captured on an ignored element', () => {
    const refEl = document.createElement('div')
    const ref = { current: refEl }
    document.body.appendChild(refEl)

    let ignoredElement = document.createElement('div')
    ignoredElement.setAttribute('id', 'el1')
    document.body.appendChild(ignoredElement)
    const handler = jest.fn()

    renderHook(() => useOutsideClickIgnoreSelectors(ref, ['#el1'], handler))

    act(() => {
      fireEvent.mouseDown(ignoredElement)
    })

    expect(handler).not.toHaveBeenCalled()
  })
})
