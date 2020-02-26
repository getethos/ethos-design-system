import React from 'react'
import { NoraDrawer } from './index'
import { render } from '@testing-library/react'

describe('NoraDrawer', () => {
  it('default rendering', () => {
    const tree = render(
      <NoraDrawer
        isOpen={true}
        position="right"
        labelCopy="Order Evidences"
        closeCopy="Cancel"
      >
        {' '}
        <p>This is a test</p>
        <button>A button</button>
      </NoraDrawer>
    )
    expect(tree).toMatchSnapshot()
  })
})
