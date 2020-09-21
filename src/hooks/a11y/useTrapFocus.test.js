import { renderHook } from '@testing-library/react-hooks'
import { fireEvent } from '@testing-library/dom'
import useTrapFocus from './useTrapFocus'
import { act } from 'react-test-renderer'

describe('useTrapFocusHook', () => {
  it('should keep focus on` the last focused element when a `ref` with no children is passed', () => {
    const elem = document.createElement('div')

    renderHook(() => useTrapFocus({ current: elem }, true))

    expect(document.activeElement).toBe(document.body)
  })

  it('should set focus on the first tabbable child of the passed `ref`', () => {
    const elem = document.createElement('div')
    const child = document.createElement('button')

    elem.appendChild(child)

    renderHook(() => useTrapFocus({ current: elem }, true))

    expect(document.activeElement).toBe(child)
  })

  it('should set focus on the next focusable element when the `tab` key is hit', () => {
    const elem = document.createElement('div')
    const child = document.createElement('button')
    const childTwo = document.createElement('button')

    for (let c of [child, childTwo]) {
      elem.appendChild(c)
    }

    renderHook(() => useTrapFocus({ current: elem }, true))

    act(() => {
      fireEvent.keyDown(elem, { key: 'Tab', keyCode: 9 })
    })

    expect(document.activeElement).toStrictEqual(childTwo)
  })

  it('should set focus on the previous element when `shift+tab` is hit', () => {
    const elem = document.createElement('div')
    const child = document.createElement('button')
    const childTwo = document.createElement('button')

    for (let c of [child, childTwo]) {
      elem.appendChild(c)
    }

    renderHook(() => useTrapFocus({ current: elem }, true))

    act(() => {
      fireEvent.keyDown(elem, { key: 'Tab', keyCode: 9 })
    })

    expect(document.activeElement).toStrictEqual(childTwo)

    act(() => {
      fireEvent.keyDown(elem, { key: 'Tab', keyCode: 9, shiftKey: true })
    })

    expect(document.activeElement).toBe(child)
  })

  it('should set focus on the last tabbable item when `shift+tab` is hit when the first tabbable item is initially focused', () => {
    const elem = document.createElement('div')
    const child = document.createElement('button')
    const childTwo = document.createElement('button')

    for (let c of [child, childTwo]) {
      elem.appendChild(c)
    }

    renderHook(() => useTrapFocus({ current: elem }, true))

    act(() => {
      fireEvent.keyDown(elem, { key: 'Tab', keyCode: 9, shiftKey: true })
    })

    expect(document.activeElement).toStrictEqual(childTwo)
  })

  it('should set focus on the first tabbable item when `tab` is hit when the last tabbable item is initally focused', () => {
    const elem = document.createElement('div')
    const child = document.createElement('button')
    const childTwo = document.createElement('button')

    for (let c of [child, childTwo]) {
      elem.appendChild(c)
    }

    renderHook(() => useTrapFocus({ current: elem }, true))

    act(() => {
      fireEvent.keyDown(elem, { key: 'Tab', keyCode: 9 })
    })

    act(() => {
      fireEvent.keyDown(elem, { key: 'Tab', keyCode: 9 })
    })

    expect(document.activeElement).toBe(child)
  })
})
