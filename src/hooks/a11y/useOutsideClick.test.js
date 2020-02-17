import { renderHook } from '@testing-library/react-hooks'
import useOutsideClick from './useOutsideClick'
import { act, fireEvent } from '@testing-library/react'

describe('useOutsideClick', () => {
  it('should fire the passed handler when an outside click is captured [mouseDown]', () => {
    const ref = { current: document.createElement('div') }
    const handler = jest.fn()

    renderHook(() => useOutsideClick(ref, handler))

    act(() => {
      fireEvent.mouseDown(document.body)
    })

    expect(handler).toHaveBeenCalled()
  })

  it('should fire the passed handler when an outside click is captured [touchStart]', () => {
    const ref = { current: document.createElement('div') }
    const handler = jest.fn()

    renderHook(() => useOutsideClick(ref, handler))

    act(() => {
      fireEvent.touchStart(document.body)
    })

    expect(handler).toHaveBeenCalled()
  })

  it('should no-op when the target ref is click [mouseDown]', () => {
    const ref = { current: document.createElement('div') }
    const handler = jest.fn()

    renderHook(() => useOutsideClick(ref, handler))

    act(() => {
      fireEvent.mouseDown(ref.current)
    })

    expect(handler).not.toHaveBeenCalled()
  })

  it('should no-op when the target ref is click [touchStart]', () => {
    const ref = { current: document.createElement('div') }
    const handler = jest.fn()

    renderHook(() => useOutsideClick(ref, handler))

    act(() => {
      fireEvent.touchStart(ref.current)
    })

    expect(handler).not.toHaveBeenCalled()
  })

  it('should no-op when an element in the target ref is click [mouseDown]', () => {
    const current = document.createElement('div')
    const child = document.createElement('button')

    current.appendChild(child)

    const ref = { current }
    const handler = jest.fn()

    renderHook(() => useOutsideClick(ref, handler))

    act(() => {
      fireEvent.mouseDown(child)
    })

    expect(handler).not.toHaveBeenCalled()
  })

  it('should no-op when an element inthe target ref is click [touchStart]', () => {
    const current = document.createElement('div')
    const child = document.createElement('button')

    current.appendChild(child)

    const ref = { current }
    const handler = jest.fn()

    renderHook(() => useOutsideClick(ref, handler))

    act(() => {
      fireEvent.touchStart(child)
    })

    expect(handler).not.toHaveBeenCalled()
  })
})
