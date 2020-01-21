import React from 'react'
import renderer from 'react-test-renderer'
import { Tag } from './Tag'

describe('Tag', () => {
  it('renders default tag', () => {
    const tree = renderer.create(<Tag>yo</Tag>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('red', () => {
    const tree = renderer.create(<Tag type="red">red</Tag>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('green', () => {
    const tree = renderer.create(<Tag type="green">green</Tag>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('orange', () => {
    const tree = renderer.create(<Tag type="orange">orange</Tag>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('cyan', () => {
    const tree = renderer.create(<Tag type="cyan">cyan</Tag>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
