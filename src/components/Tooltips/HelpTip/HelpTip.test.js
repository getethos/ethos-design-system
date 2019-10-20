import React from 'react'
import { HelpTip } from './HelpTip'
import renderer from 'react-test-renderer'

const formChangeHandlerStub = jest.fn()

describe('HelpTip', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
        <HelpTip
          labelCopy="Aria label copy"
          helpCopy="this is the tip message"
          data-tid="le-help-tip"
          position="above"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
