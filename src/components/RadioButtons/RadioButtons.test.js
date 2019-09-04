import React from 'react'
import { RadioButtonGroup } from './RadioButtons.js'
import renderer from 'react-test-renderer'

describe('RadioButtonGroup', () => {
  describe('API', () => {
    test('exports properly', () => {
      expect(RadioButtonGroup).toBeDefined()
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
