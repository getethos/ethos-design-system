import React from 'react'
import { Button } from './Button'
import renderer from 'react-test-renderer'

describe('Button', () => {
  describe('API', () => {
    test('has correct shape', () => {
      expect(Button).toBeDefined()
      expect(Button.Medium).toBeDefined()
      expect(Button.Medium.Black).toBeDefined()
      expect(Button.Medium.BlackOutline).toBeDefined()
      expect(Button.Medium.WhiteOutline).toBeDefined()
      expect(Button.Medium.Stateful).toBeDefined()
      expect(Button.Medium.Stateful.Default).toBeDefined()
      expect(Button.Medium.Stateful.White).toBeDefined()
      expect(Button.Unstyled).toBeDefined()
    })
  })

  describe('default rendering', () => {
    test('Button.Medium.Black', () => {
      const tree = renderer
        .create(
          <Button.Medium.Black data-tid="foo" name="bar" disabled={false}>
            test
          </Button.Medium.Black>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
    test('Stateful isSelected', () => {
      const tree = renderer
        .create(
          <Button.Medium.Stateful.Default
            isSelected={true}
            data-tid="foo"
            name="bar"
          >
            test
          </Button.Medium.Stateful.Default>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
    test('Stateful isSelected White', () => {
      const tree = renderer
        .create(
          <Button.Medium.Stateful.White
            isSelected={true}
            data-tid="foo"
            name="bar"
          >
            test
          </Button.Medium.Stateful.White>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
