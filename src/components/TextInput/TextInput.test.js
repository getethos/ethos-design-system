import React from 'react'
import { TextInput } from './TextInput'
import renderer from 'react-test-renderer'

describe('TextInput', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
        <TextInput
          name="nombre"
          allCaps={true}
          labelCopy="The label"
          data-tid="the-text-input"
          validator={(x) =>
            x.length % 2
              ? 'Text does not have an even number of characters'
              : ''
          }
          autoComplete="name"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
