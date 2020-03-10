import { preventCurrentPageNavigation } from './preventCurrentPageNavigation'

describe('preventCurrentPageNavigation helper', () => {
  let href = '/'

  const clickEvent = {
    preventDefault: () => {
      return
    },
  }
  const keyPressEvent = {
    key: 'Enter',
    preventDefault: () => {
      return
    },
  }

  const wrongKeyPressEvent = {
    key: 'NotEnter',
  }

  beforeEach(() => {
    global.window = Object.create(window)
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/',
        hash: '#a-hash',
      },
      writable: true,
    })
  })

  afterEach(() => {
    global.window.location.pathname = '/'
    href = '/'
  })

  it('should handle an index page click on current page link', () => {
    const testFunc = jest.fn()
    preventCurrentPageNavigation({
      event: clickEvent,
      href: href,
      keyPress: false,
      currentPageFunction: testFunc,
      currentPageCondition: true,
    })
    expect(testFunc).toHaveBeenCalled()
  })

  it('should handle a page click on current page link', () => {
    const testFunc = jest.fn()
    href = '/sample/'
    global.window.location.pathname = '/sample/'
    preventCurrentPageNavigation({
      event: clickEvent,
      href: href,
      keyPress: false,
      currentPageFunction: testFunc,
      currentPageCondition: true,
    })
    expect(testFunc).toHaveBeenCalled()
  })

  it('should handle a page click on current page link regardless of trailing slash on href', () => {
    const testFunc = jest.fn()
    href = '/sample'
    global.window.location.pathname = '/sample/'
    preventCurrentPageNavigation({
      event: clickEvent,
      href: href,
      keyPress: false,
      currentPageFunction: testFunc,
      currentPageCondition: true,
    })
    expect(testFunc).toHaveBeenCalled()
  })

  it('should handle a page click on current page link regardless of trailing slash on pathname', () => {
    const testFunc = jest.fn()
    href = '/sample/'
    global.window.location.pathname = '/sample'
    preventCurrentPageNavigation({
      event: clickEvent,
      href: href,
      keyPress: false,
      currentPageFunction: testFunc,
      currentPageCondition: true,
    })
    expect(testFunc).toHaveBeenCalled()
  })

  it('should handle a page click on current page link with a longer path', () => {
    const testFunc = jest.fn()
    href = '/sample/pathname/long/'
    global.window.location.pathname = '/sample/pathname/long/'
    preventCurrentPageNavigation({
      event: clickEvent,
      href: href,
      keyPress: false,
      currentPageFunction: testFunc,
      currentPageCondition: true,
    })
    expect(testFunc).toHaveBeenCalled()
  })

  it('should handle a page click on current page link with hash in href', () => {
    const testFunc = jest.fn()
    href = '/sample/'
    global.window.location.pathname = '/sample/#test'
    global.window.location.hash = '#test'
    preventCurrentPageNavigation({
      event: clickEvent,
      href: href,
      keyPress: false,
      currentPageFunction: testFunc,
      currentPageCondition: true,
    })
    expect(testFunc).toHaveBeenCalled()
  })

  it('should handle a keyPress on current page link', () => {
    const testFunc = jest.fn()
    preventCurrentPageNavigation({
      event: keyPressEvent,
      href: href,
      keyPress: true,
      currentPageFunction: testFunc,
      currentPageCondition: true,
    })
    expect(testFunc).toHaveBeenCalled()
  })

  it('should not fire for a different page link being clicked', () => {
    const testFunc = jest.fn()
    global.window.location.pathname = '/not-index/'
    preventCurrentPageNavigation({
      event: clickEvent,
      href: href,
      keyPress: false,
      currentPageFunction: testFunc,
      currentPageCondition: true,
    })
    expect(testFunc).not.toHaveBeenCalled()
  })

  it('should not fire for false currentPageCondition', () => {
    const testFunc = jest.fn()
    preventCurrentPageNavigation({
      event: clickEvent,
      href: href,
      keyPress: false,
      currentPageFunction: testFunc,
      currentPageCondition: false,
    })
    expect(testFunc).not.toHaveBeenCalled()
  })

  it('should not fire for a non enter key press', () => {
    const testFunc = jest.fn()
    preventCurrentPageNavigation({
      event: wrongKeyPressEvent,
      href: href,
      keyPress: true,
      currentPageFunction: testFunc,
      currentPageCondition: false,
    })
    expect(testFunc).not.toHaveBeenCalled()
  })
})
