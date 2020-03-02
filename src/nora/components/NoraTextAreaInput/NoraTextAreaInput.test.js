import React from 'react'
import { NoraTextAreaInput } from './NoraTextAreaInput'
import renderer from 'react-test-renderer'

describe('NoraTextAreaInput', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
        <NoraTextAreaInput
          name="nombre"
          placeholder="enter text here"
          data-tid="text-nora-textareainput"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
