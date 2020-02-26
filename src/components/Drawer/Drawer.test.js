import React from 'react'
import { Drawer } from './index'
import { render, screen } from '@testing-library/react'

describe('Drawer', () => {
  it('default rendering', () => {
    const testMessage = 'Test Message'
    const tree = render(
      <Drawer isOpen={true} position="right">
        {' '}
        <p>{testMessage}</p>
        <button>A button</button>
      </Drawer>
    )
    expect(tree).toMatchSnapshot()
  })

  it('isOpen falsy', () => {
    const testMessage = 'Test Message'
    const { container } = render(
      <Drawer isOpen={false} position="right">
        {' '}
        <p>{testMessage}</p>
        <button>A button</button>
      </Drawer>
    )
    expect(container.firstChild.classList.contains('Open')).toBe(false)
  })

  it('isOpen truthy', () => {
    const testMessage = 'Test Message'
    const { container } = render(
      <Drawer isOpen={true} position="right">
        {' '}
        <p>{testMessage}</p>
        <button>A button</button>
      </Drawer>
    )
    expect(screen.getByText(testMessage)).toBeDefined()
    expect(container.firstChild.classList.contains('Open')).toBe(true)
  })
})
