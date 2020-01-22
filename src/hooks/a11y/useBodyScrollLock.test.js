import useBodyScrollLock, { LOCK_SCROLL_STYLES } from './useBodyScrollLock'
import { renderHook } from '@testing-library/react-hooks'

describe('useBodyScrollLock', () => {
  it('should set the scroll lock styles when activated', () => {
    const scrollToMock = jest.fn()
    window.scrollTo = scrollToMock

    const expectedStyles = LOCK_SCROLL_STYLES(window.scrollY)

    renderHook(() => useBodyScrollLock(true))

    const actualStyles = document.body.style
    expect(actualStyles.cssText).toEqual(expectedStyles)
  })

  it('should remove the scroll lock styles when activated', () => {
    const scrollToMock = jest.fn()
    window.scrollTo = scrollToMock

    const expectedStyles = LOCK_SCROLL_STYLES(window.scrollY)

    const { rerender } = renderHook(
      ({ isActive }) => useBodyScrollLock(isActive),
      { initialProps: { isActive: true } }
    )

    const actualStylesFirstRender = document.body.style
    expect(actualStylesFirstRender.cssText).toEqual(expectedStyles)

    rerender({ isActive: false })

    const actualStyles = document.body.style
    expect(actualStyles.cssText).toEqual('')
  })

  it('should call scrollTo when the lock is deactivated', () => {
    const scrollToMock = jest.fn()
    window.scrollTo = scrollToMock

    const { rerender } = renderHook(
      ({ isActive }) => useBodyScrollLock(isActive),
      { initialProps: { isActive: true } }
    )

    rerender({ isActive: false })

    expect(scrollToMock).toHaveBeenCalled()
  })
})
