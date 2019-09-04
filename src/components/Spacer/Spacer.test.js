import React from 'react'
import { Spacer } from './Spacer.js'
import renderer from 'react-test-renderer'

describe('Spacer', () => {
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
