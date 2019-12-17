import React from 'react'
import TestRenderer from 'react-test-renderer'

import { Row } from './Row.js'

function render(props) {
  return TestRenderer.create(
    <Row {...props}>
      <div>I am the first column</div>
      <div>I am the second column</div>
    </Row>
  )
}

test('renders the default state', () => {
  const row = TestRenderer.create(
    <Row>
      <div>Foo</div>
      <div>Bar</div>
      <div>Baz</div>
    </Row>
  ).toJSON()
  expect(row).toMatchSnapshot()
})

test('className', () => {
  const row = TestRenderer.create(
    <Row className="fooby">
      <div>Foo</div>
      <div>Bar</div>
      <div>Baz</div>
    </Row>
  ).toJSON()
  expect(row).toMatchSnapshot()
  expect(row.props.className).toStrictEqual('fooby')
})

test('columns are inactive be default', () => {
  const row = TestRenderer.create(
    <Row active={false} columnIndex={-1}>
      <div>Foo</div>
      <div>Bar</div>
    </Row>
  ).toJSON()
  expect(row.children[0].props.active).toStrictEqual(false)
  expect(row.children[1].props.active).toStrictEqual(false)
})

test('adds active attribute to column index specified', () => {
  for (let i = 0; i < 2; i++) {
    const renderer = render({ active: true, columnIndex: i })
    const root = renderer.toJSON()
    expect(root.children[i].props.active).toStrictEqual(true)
  }
})
