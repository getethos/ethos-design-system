import React from 'react'
import { Spacer } from './Spacer.js'
import { configure, shallow, mount, render } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('Spacer', () => {
  describe('API', () => {
    test('Spacer exports properly', () => {
      expect(Spacer).toBeDefined()
    })
  })

  describe('Responsiveness', () => {
    const BREAKPOINTS = ['phone', 'tablet', 'laptop', 'desktop']
    const tester = (arr, propName) => {
      expect(arr.length).toBe(4)
      const props = { [propName]: arr }
      const wrapper = mount(<Spacer {...props} />)
      const spacey = wrapper.find('.Spacer')
      expect(spacey).toBeDefined()
      expect(spacey.hasClass('Spacer')).toBe(true)
      expect(
        spacey.hasClass(
          'spacer-' + propName + '-' + BREAKPOINTS[0] + '-' + arr[0]
        )
      ).toBe(true)
      expect(
        spacey.hasClass(
          'spacer-' + propName + '-' + BREAKPOINTS[1] + '-' + arr[1]
        )
      ).toBe(true)
      expect(
        spacey.hasClass(
          'spacer-' + propName + '-' + BREAKPOINTS[2] + '-' + arr[2]
        )
      ).toBe(true)
      expect(
        spacey.hasClass(
          'spacer-' + propName + '-' + BREAKPOINTS[3] + '-' + arr[3]
        )
      ).toBe(true)
    }

    test('Spacer has responsive heights', () => {
      // Note: testing that the css class actually applies seems out of scope
      // of enzyme for now.
      tester([4, 8, 16, 24], 'height')
      tester([16, 72, 24, 8], 'height')
    })

    test('Spacer has responsive widths', () => {
      tester([4, 8, 16, 24], 'width')
      tester([16, 72, 24, 8], 'width')
    })

    test('Spacer throws on improper height', () => {
      console.error = jest.fn()
      try {
        mount(<Spacer height={[1, 1, 1, 1]} />)
        expect(true).toBe(false)
      } catch (e) {
        const expectedError = 'Invalid height value supplied to prop "height."'
        expect(e.message.substr(0, expectedError.length)).toBe(expectedError)
      }
      console.error.mockRestore()
    })

    test('Spacer throws on improper width', () => {
      console.error = jest.fn()
      try {
        mount(<Spacer width={[1, 1, 1, 1]} />)
        expect(true).toBe(false)
      } catch (e) {
        const expectedError = 'Invalid width value supplied to prop "width."'
        expect(e.message.substr(0, expectedError.length)).toBe(expectedError)
      }
      console.error.mockRestore()
    })
  })
})
