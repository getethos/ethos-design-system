import React from 'react'
import { NumberInput } from './index.js';
import renderer from 'react-test-renderer'

// TODO: make a helper
// https://github.com/text-mask/text-mask/issues/427
jest.mock('react-text-mask', () => (props) => <input type="text" {...props} />)

const formChangeHandlerStub = jest.fn()

describe('NumberInput', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
         <NumberInput
          initialValue="123"
          name="the-number-input-example"
          allCaps={true}
          labelCopy="Enter a number (must be even to validate)"
          data-tid='the-number-input'
          placeholder='number input'
          formChangeHandler={formChangeHandlerStub}
          validator={(n) => {
            return n % 2 === 0 ? '' : 'Must be an even number'
          }}
        /> 
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
