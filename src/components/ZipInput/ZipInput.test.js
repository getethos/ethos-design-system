import React from 'react'
import { ZipInput } from './ZipInput'
import renderer from 'react-test-renderer'

// TODO: make a helper
// https://github.com/text-mask/text-mask/issues/427
jest.mock('react-text-mask', () => (props) => <input type="text" {...props} />)

describe('ZipInput', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
        <ZipInput
          name="le-zip"
          allCaps={true}
          labelCopy="What is your zip code?"
          data-tid="le-zip"
          validator={() => {}}
          autoComplete="postal-code"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
