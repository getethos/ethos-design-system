import React from 'react'
import { RadioButtonGroup, focusHelper } from './RadioButtons'
import renderer from 'react-test-renderer'

var focusOnTargetSpy = jest.fn()
jest.spyOn(focusHelper, 'focus').mockImplementation(focusOnTargetSpy)

describe('RadioButtonGroup', () => {
  describe('API', () => {
    test('exports properly', () => {
      expect(RadioButtonGroup).toBeDefined()
    })

    test('sets `initialValue` and `onChange` handler callback fires', () => {
      const onChangeStub = jest.fn()
      const optionValues = ['foo', 'bar']

      const optionsRadios = optionValues.map((t) => ({
        name: t,
        value: t,
        label: `${t} -- description`,
      }))

      const tree = renderer.create(
        <RadioButtonGroup
          name="intent"
          labelCopy="When would you like to apply?"
          initialValue={optionValues[0]}
          onChange={onChangeStub}
          options={optionsRadios}
        />
      )

      const instance = tree.root
      // const options = instance.findAllByType()
      const options = instance.findAll(
        (el) => el.type == 'input' && el.props.type == 'radio'
      )

      const [first] = options

      renderer.act(() => {
        first.props.onClick()
      })

      expect(onChangeStub).toHaveBeenCalledWith({
        value: optionValues[0],
        isAnswered: true,
      })
    })

    test('click handler fires', () => {
      const onClickStub = jest.fn()
      const value = 'foo'
      const tree = renderer.create(
        <RadioButtonGroup
          name="intent"
          labelCopy="When would you like to apply?"
          options={[
            {
              label: value,
              onClick: onClickStub,
              name: value,
              value: value,
            },
          ]}
        />
      )
      const instance = tree.root
      const option = instance.find(
        (el) => el.type == 'input' && el.props.type == 'radio'
      )
      renderer.act(() => {
        option.props.onClick()
      })
      expect(onClickStub).toHaveBeenCalled()
    })
  })

  describe('default rendering', () => {
    test('RadioButtonGroup', () => {
      const tree = renderer
        .create(
          <RadioButtonGroup
            name="gender"
            initialValue="M"
            labelCopy="When would you like to apply?"
            onChange={() => {}}
            options={[
              {
                'data-tid': 'gender-male',
                name: 'male',
                label: 'Male',
                value: 'M',
              },
              {
                'data-tid': 'gender-female',
                name: 'female',
                label: 'Female',
                value: 'F',
              },
            ]}
          />
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
