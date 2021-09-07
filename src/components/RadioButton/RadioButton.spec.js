import React from 'react'
import { RadioButton, focusHelper } from './RadioButton.js'
import renderer from 'react-test-renderer'

var focusOnTargetSpy = jest.fn()
jest.spyOn(focusHelper, 'focus').mockImplementation(focusOnTargetSpy)

describe('RadioButton', () => {
  describe('API', () => {
    test('exports properly', () => {
      expect(RadioButton).toBeDefined()
    })

    test('onClick fires', () => {
      const onClickStub = jest.fn()

      const tree = renderer.create(
        <RadioButton
          name="name"
          value="value"
          onClick={onClickStub}
          label="label"
          tabIndex={0}
          key="key"
        />
      )

      const instance = tree.root
      const options = instance.findAll(
        (el) => el.type == 'input' && el.props.type == 'radio'
      )

      const [first] = options

      renderer.act(() => {
        first.props.onClick()
      })

      expect(onClickStub).toHaveBeenCalled()
    })
  })
})
