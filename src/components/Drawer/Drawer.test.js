import React from 'react'
import { Drawer } from './index'
import { render, screen } from '@testing-library/react'

const onDismissFn = jest.fn()

describe('Drawer', () => {
  it('default rendering', () => {
    const testMessage = 'Test Message'
    const tree = render(
      <Drawer onDismiss={onDismissFn} isOpen={true} position="right">
        {' '}
        <p>{testMessage}</p>
        <button>A button</button>
      </Drawer>
    )
    expect(tree).toMatchSnapshot()
  })

  it('isOpen falsy', () => {
    const testMessage = 'Test Message'
    const { queryByTestId } = render(
      <Drawer
        data-tid="le-drawer"
        onDismiss={onDismissFn}
        isOpen={false}
        position="right"
      >
        {' '}
        <p>{testMessage}</p>
        <button>A button</button>
      </Drawer>
    )
    expect(queryByTestId('le-drawer').classList.contains('Open')).toBe(false)
  })

  it('isOpen truthy', () => {
    const testMessage = 'Test Message'
    const { queryByTestId } = render(
      <Drawer
        data-tid="le-drawer"
        onDismiss={onDismissFn}
        isOpen={true}
        position="right"
      >
        {' '}
        <p>{testMessage}</p>
        <button>A button</button>
      </Drawer>
    )
    expect(screen.getByText(testMessage)).toBeDefined()
    expect(queryByTestId('le-drawer').classList.contains('Open')).toBe(true)
  })
})
