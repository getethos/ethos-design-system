import React from 'react'
import { NoraDrawer } from './index'
import { render } from '@testing-library/react'

describe('NoraDrawer', () => {
  it('default rendering', () => {
    const onDismissFn = jest.fn()
    const tree = render(
      <NoraDrawer
        isOpen={true}
        position="right"
        labelCopy="Order Evidences"
        closeCopy="Cancel"
        onDismiss={onDismissFn}
      >
        {' '}
        <p>This is a test</p>
        <button>A button</button>
      </NoraDrawer>
    )
    expect(tree).toMatchSnapshot()
  })
})
