import React from 'react'
import { NoraCheckboxInput } from './NoraCheckboxInput'
import renderer from 'react-test-renderer'

const formChangeHandlerStub = jest.fn()

describe('NoraCheckboxInput', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
        <NoraCheckboxInput
          name="le-check"
          data-tid="le-tid"
          formChangeHandler={formChangeHandlerStub}
          validator={(x) => (x === true ? '' : 'Nope!')}
        >
          I agree to the{' '}
          <a href="/" target="_blank">
            Agreement
          </a>
        </NoraCheckboxInput>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
