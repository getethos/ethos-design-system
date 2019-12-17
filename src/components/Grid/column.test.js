import React from 'react'
import TestRenderer from 'react-test-renderer'

import Column from './column.js'

function render(props) {
  const columnRef = React.createRef()

  return TestRenderer.create(
    <Column name="le-col" columnRef={columnRef} {...props}>
      {(active, interactiveRef) =>
        `Column is ${active ? 'active' : 'inactive'}${
          interactiveRef ? ' and interactive' : ''
        }`
      }
    </Column>,
    {
      createNodeMock: () => ({
        focus: jest.fn(),
      }),
    }
  )
}

test('renders the default state', () => {
  const renderer = render()
  const root = renderer.toJSON()

  expect(root.children.length).toStrictEqual(1)
  expect(root.children[0]).toStrictEqual('Column is inactive')
  expect(root.props.role).toStrictEqual('cell')
  expect(root.props.tabIndex).toStrictEqual(-1)
})

test('has a className property', () => {
  const renderer = render({ className: 'part-of-the-api' })
  const root = renderer.toJSON()

  expect(root.props.className).toStrictEqual('part-of-the-api')
})

describe('active property', () => {
  it('enables interactivity', () => {
    const renderer = render({ active: true })
    const root = renderer.toJSON()

    expect(root.props.tabIndex).toStrictEqual(0)
  })

  it('disables interactivity', () => {
    const renderer = render({ active: false })
    const root = renderer.toJSON()

    expect(root.props.tabIndex).toStrictEqual(-1)
  })

  it('passes the property to its children', () => {
    const activeRenderer = render({ active: true })
    const activeRoot = activeRenderer.toJSON()
    expect(activeRoot.children[0]).toStrictEqual('Column is active')

    const inactiveRenderer = render({ active: false })
    const inactiveRoot = inactiveRenderer.toJSON()
    expect(inactiveRoot.children[0]).toStrictEqual('Column is inactive')
  })
})

describe('focus behavior', () => {
  it('focuses the column ref', () => {
    const renderer = render({ active: true })
    const root = renderer.toJSON()
    expect(root.props.tabIndex).toStrictEqual(0)
    expect(root.children[0]).toStrictEqual('Column is active')
  })

  it('does not focus the column ref', () => {
    const renderer = render({ active: false })
    const root = renderer.toJSON()
    expect(root.props.tabIndex).toStrictEqual(-1)
    expect(root.children[0]).toStrictEqual('Column is inactive')
  })
})

describe('header property', () => {
  it('dictates rowheader role', () => {
    const renderer = render({ header: true })
    const root = renderer.toJSON()

    expect(root.props.role).toStrictEqual('rowheader')
  })

  it('dictates column role', () => {
    const renderer = render({ header: false })
    const root = renderer.toJSON()

    expect(root.props.role).toStrictEqual('cell')
  })
})

describe('interactive property', () => {
  it('disables interactivity on column container', () => {
    const renderer = render({ interactive: true })
    const root = renderer.toJSON()

    expect(root.props.tabIndex).toStrictEqual(undefined)
  })

  it('passes the interactivity reference to its children', () => {
    const renderer = render({ interactive: true })
    const root = renderer.toJSON()

    expect(root.children[0]).toStrictEqual('Column is inactive and interactive')
  })
})
