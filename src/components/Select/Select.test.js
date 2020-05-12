import React from 'react'
import { Select } from './Select.js'
import { render } from '@testing-library/react'

describe('Select', () => {
  const mockProps = {
    className: 'foo',
    isCompact: true,
    'data-tid': 'my-select',
  }

  test.only('matches snapshot', () => {
    const tree = render(<Select {...mockProps} />)
    expect(tree).toMatchSnapshot()
  })

  test('adding a title prop adds a div and aria-label', () => {
    const tree = renderer
      .create(<Select {...mockProps} title="Hello World" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
