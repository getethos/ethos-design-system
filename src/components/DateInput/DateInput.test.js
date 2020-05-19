import React from 'react'
import { DateInput } from './DateInput'
import renderer from 'react-test-renderer'

// TODO: make a helper
// https://github.com/text-mask/text-mask/issues/427
jest.mock('react-text-mask', () => (props) => <input type="text" {...props} />)

describe('DateInput', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
        <DateInput
          dateFormat="mm/yyyy"
          labelCopy="When did you apply for this life insurance?"
          data-tid="when-applied-for"
          validator={() => {}}
          name="whenapplied"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
