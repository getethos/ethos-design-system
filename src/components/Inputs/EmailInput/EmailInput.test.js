import React from 'react'
import { EmailInput } from './index.js'
import renderer from 'react-test-renderer'

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
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
