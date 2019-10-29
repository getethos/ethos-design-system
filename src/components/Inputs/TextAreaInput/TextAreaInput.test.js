import React from 'react'
import { TextAreaInput } from './TextAreaInput'
import renderer from 'react-test-renderer'

describe('TextAreaInput', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
        <TextAreaInput
          name="nombre"
          resize={true}
          allCaps={true}
          labelCopy="The label"
          data-tid="the-text-input"
          validator={(x) =>
            x.length % 2
              ? 'Text does not have an even number of characters'
              : ''
          }
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
