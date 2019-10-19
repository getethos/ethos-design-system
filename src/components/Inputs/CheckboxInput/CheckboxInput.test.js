import React from 'react'
import { CheckboxInput } from './CheckboxInput'
import renderer from 'react-test-renderer'

const formChangeHandlerStub = jest.fn()

describe('CheckboxInput', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
        <CheckboxInput
          name="le-check"
          data-tid="le-tid"
          formChangeHandler={formChangeHandlerStub}
          validator={(x) => x === true ? '' : 'Nope!'}
        >
          I agree to the{' '}
          <a href="/" target="_blank">
            Agreement
          </a>
        </CheckboxInput>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
