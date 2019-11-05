import React from 'react'
import { RadioButtonGroup } from './RadioButtons.js'
import renderer from 'react-test-renderer'

describe('RadioButtonGroup', () => {
  describe('API', () => {
    test('exports properly', () => {
      expect(RadioButtonGroup).toBeDefined()
    })

    test('sets `initialValue` and `onSelect` handler callback fires', () => {
      const onSelectStub = jest.fn()
      const optionValues = ['foo', 'bar']

      const optionsRadios = optionValues.map((t) => ({
        name: t,
        value: t,
        label: `${t} -- description`,
      }))

      const tree = renderer.create(
        <RadioButtonGroup
          name="intent"
          initialValue={optionValues[0]}
          onSelect={onSelectStub}
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

      expect(onSelectStub).toHaveBeenCalledWith({
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
            value="Female"
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
