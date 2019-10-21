import React from 'react'
import { Spacer } from './Spacer.js'
import renderer from 'react-test-renderer'

describe('Spacer', () => {
  describe('matches snapshot', () => {
    test('Spacer.H80', () => {
      expect(deepSnapshot(<Spacer.H80 />)).toMatchSnapshot()
    })

    test('Spacer.H72', () => {
      expect(deepSnapshot(<Spacer.H72 />)).toMatchSnapshot()
    })

    test('Spacer.H64', () => {
      expect(deepSnapshot(<Spacer.H64 />)).toMatchSnapshot()
    })

    test('Spacer.H56', () => {
      expect(deepSnapshot(<Spacer.H56 />)).toMatchSnapshot()
    })

    test('Spacer.H48', () => {
      expect(deepSnapshot(<Spacer.H48 />)).toMatchSnapshot()
    })

    test('Spacer.H40', () => {
      expect(deepSnapshot(<Spacer.H40 />)).toMatchSnapshot()
    })

    test('Spacer.H32', () => {
      expect(deepSnapshot(<Spacer.H32 />)).toMatchSnapshot()
    })

    test('Spacer.H24', () => {
      expect(deepSnapshot(<Spacer.H24 />)).toMatchSnapshot()
    })

    test('Spacer.H16', () => {
      expect(deepSnapshot(<Spacer.H16 />)).toMatchSnapshot()
    })

    test('Spacer.H8', () => {
      expect(deepSnapshot(<Spacer.H8 />)).toMatchSnapshot()
    })

    test('Spacer.H4', () => {
      expect(deepSnapshot(<Spacer.H4 />)).toMatchSnapshot()
    })

    test('Spacer.W80', () => {
      expect(deepSnapshot(<Spacer.W80 />)).toMatchSnapshot()
    })

    test('Spacer.W72', () => {
      expect(deepSnapshot(<Spacer.W72 />)).toMatchSnapshot()
    })

    test('Spacer.W64', () => {
      expect(deepSnapshot(<Spacer.W64 />)).toMatchSnapshot()
    })

    test('Spacer.W64', () => {
      expect(deepSnapshot(<Spacer.W64 />)).toMatchSnapshot()
    })

    test('Spacer.W56', () => {
      expect(deepSnapshot(<Spacer.W56 />)).toMatchSnapshot()
    })

    test('Spacer.W48', () => {
      expect(deepSnapshot(<Spacer.W48 />)).toMatchSnapshot()
    })

    test('Spacer.W40', () => {
      expect(deepSnapshot(<Spacer.W40 />)).toMatchSnapshot()
    })

    test('Spacer.W32', () => {
      expect(deepSnapshot(<Spacer.W32 />)).toMatchSnapshot()
    })

    test('Spacer.W24', () => {
      expect(deepSnapshot(<Spacer.W24 />)).toMatchSnapshot()
    })

    test('Spacer.W16', () => {
      expect(deepSnapshot(<Spacer.W16 />)).toMatchSnapshot()
    })

    test('Spacer.W8', () => {
      expect(deepSnapshot(<Spacer.W8 />)).toMatchSnapshot()
    })

    test('Spacer.W4', () => {
      expect(deepSnapshot(<Spacer.W4 />)).toMatchSnapshot()
    })
  })

  describe('API', () => {
    test('Spacer exports properly', () => {
      expect(Spacer).toBeDefined()
      expect(Spacer.H80).toBeDefined()
      expect(Spacer.H72).toBeDefined()
      expect(Spacer.H64).toBeDefined()
      expect(Spacer.H56).toBeDefined()
      expect(Spacer.H48).toBeDefined()
      expect(Spacer.H40).toBeDefined()
      expect(Spacer.H32).toBeDefined()
      expect(Spacer.H24).toBeDefined()
      expect(Spacer.H16).toBeDefined()
      expect(Spacer.H8).toBeDefined()
      expect(Spacer.H4).toBeDefined()
      expect(Spacer.W80).toBeDefined()
      expect(Spacer.W72).toBeDefined()
      expect(Spacer.W64).toBeDefined()
      expect(Spacer.W64).toBeDefined()
      expect(Spacer.W56).toBeDefined()
      expect(Spacer.W48).toBeDefined()
      expect(Spacer.W40).toBeDefined()
      expect(Spacer.W32).toBeDefined()
      expect(Spacer.W24).toBeDefined()
      expect(Spacer.W16).toBeDefined()
      expect(Spacer.W8).toBeDefined()
      expect(Spacer.W4).toBeDefined()
    })
  })
})

export function deepSnapshot(jsx) {
  return renderer.create(jsx).toJSON()
}
