import React from 'react'
import { PasswordInput } from './PasswordInput'
import renderer from 'react-test-renderer'
import validatePassword from '../../../validators/validatePassword'

const formChangeHandlerStub = jest.fn()

describe('PasswordInput', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
        <PasswordInput
          name="password-example"
          labelCopy="Password"
          data-tid="the-password-input"
          formChangeHandler={formChangeHandlerStub}
          validator={validatePassword}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
