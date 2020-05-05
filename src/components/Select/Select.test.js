import React from 'react'
import renderer from 'react-test-renderer'
import { Select } from './Select.js'

describe('Select', () => {
  const mockProps = {
    className: 'foo',
    isCompact: true,
    'data-tid': 'my-select',
  }

  test('matches snapshot', () => {
    const tree = renderer.create(<Select {...mockProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('title adds a div and aria-label', () => {
    const tree = renderer
      .create(<Select {...mockProps} title="Hello World" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
