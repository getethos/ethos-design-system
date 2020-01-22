import { renderHook } from '@testing-library/react-hooks'
import useAriaHideSiblings from './useHideAriaSiblings.js'

describe('useHideAriaSiblings', () => {
  it('should set all children under the body to `aria-hidden` with the exception of the refs tree', () => {
    const refRoot = document.createElement('header')
    const refSibling = document.createElement('div')

    const target = document.createElement('h1')
    refRoot.appendChild(target)

    for (let c of [refRoot, refSibling]) {
      document.body.appendChild(c)
    }

    const ref = { current: target }
    renderHook(() => useAriaHideSiblings(ref, true))

    expect(refRoot.getAttribute('aria-hidden')).toBe(null)
    expect(refSibling.getAttribute('aria-hidden')).toBe('true')
  })

  it('should reset all children to their previous aria-hidden state when the hook is deactivated', () => {
    const refRoot = document.createElement('header')

    const refSibling = document.createElement('div')
    const refSiblingHiddenTrue = document.createElement('div')
    const refSiblingHiddenFalse = document.createElement('div')

    refSiblingHiddenTrue.setAttribute('aria-hidden', true)
    refSiblingHiddenFalse.setAttribute('aria-hidden', false)

    const target = document.createElement('h1')
    refRoot.appendChild(target)

    const siblings = [refSibling, refSiblingHiddenTrue, refSiblingHiddenFalse]

    for (let c of [refRoot, ...siblings]) {
      document.body.appendChild(c)
    }

    const elemRef = { current: target }
    const { rerender } = renderHook(
      ({ ref, isActive }) => useAriaHideSiblings(ref, isActive),
      { initialProps: { ref: elemRef, isActive: true } }
    )

    expect(refRoot.getAttribute('aria-hidden')).toBe(null)
    for (let c of siblings) {
      expect(c.getAttribute('aria-hidden')).toBe('true')
    }

    rerender({ ref: elemRef, isActive: false })

    expect(refSibling.getAttribute('aria-hidden')).toBe(null)
    expect(refSiblingHiddenTrue.getAttribute('aria-hidden')).toBe('true')
    expect(refSiblingHiddenFalse.getAttribute('aria-hidden')).toBe('false')
  })
})
