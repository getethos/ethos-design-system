import React from 'react'
import { CheckboxInput2 } from './CheckboxInput2'
import renderer from 'react-test-renderer'

const formChangeHandlerStub = jest.fn()

describe('CheckboxInput2', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
        <CheckboxInput2
          name="le-check"
          data-tid="le-tid"
          formChangeHandler={formChangeHandlerStub}
          validator={(x) => (x === true ? '' : 'Nope!')}
        >
          I agree to the{' '}
          <a href="/" target="_blank">
            Agreement
          </a>
        </CheckboxInput2>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('checked takes precedence over initial and current values', () => {
    const rendered = renderer.create(
      <CheckboxInput2
        // Note `currentValue` is generally only passed in by the form engine, but
        // we do it here because we need to ensure `checked` is taking precedence.
        currentValue={false}
        initialValue={false}
        checked={true}
        name="le-check"
        data-tid="le-tid"
      >
        le children
      </CheckboxInput2>
    )
    const tree = rendered.toTree()
    expect(tree.props.checked).toBe(true)
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
