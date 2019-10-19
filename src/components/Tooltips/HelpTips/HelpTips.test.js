import React from 'react'
import { HelpTips } from './HelpTips'
import renderer from 'react-test-renderer'

const formChangeHandlerStub = jest.fn()

describe('HelpTips', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
        <HelpTips
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
