import React from 'react'
import { Tooltip } from './Tooltip.js'
import renderer from 'react-test-renderer'

describe('Tooltip', () => {
  describe('API', () => {
    test('exports properly', () => {
      expect(Tooltip).toBeDefined()
    })
  })

  describe('rendering component', () => {
    test('default', () => {
      const tree = renderer
        .create(<Tooltip label="Test" details="Test details" />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
