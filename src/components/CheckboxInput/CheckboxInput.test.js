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
          validator={(x) => (x === true ? '' : 'Nope!')}
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
  it('checked takes precedence over initial and current values', () => {
    const rendered = renderer.create(
      <CheckboxInput
        // Note `currentValue` is generally only passed in by the form engine, but
        // we do it here because we need to ensure `checked` is taking precedence.
        currentValue={false}
        initialValue={false}
        checked={true}
        name="le-check"
        data-tid="le-tid"
      >
        le children
      </CheckboxInput>
    )
    const tree = rendered.toTree()
    expect(tree.props.checked).toBe(true)
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
