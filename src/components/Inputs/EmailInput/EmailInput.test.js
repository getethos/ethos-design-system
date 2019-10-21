import React from 'react'
import { EmailInput } from './index.js'
import renderer from 'react-test-renderer'

// TODO: make a helper
// https://github.com/text-mask/text-mask/issues/427
jest.mock('react-text-mask', () => (props) => <input type="email" {...props} />)

const formChangeHandlerStub = jest.fn()

describe('EmailInput', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
        <EmailInput
          name="the-email-input-example"
          allCaps={true}
          labelCopy="Your email"
          data-tid="the-email-input"
          placeholder="example@ethoslife.com"
          formChangeHandler={formChangeHandlerStub}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
