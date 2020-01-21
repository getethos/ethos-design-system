import React from 'react'
import renderer from 'react-test-renderer'
import { Header } from './Header'

describe('Header', () => {
  it('renders defaults', () => {
    const tree = renderer
      .create(<Header name="nombre" title="Le Title" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
