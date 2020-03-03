import React from 'react'
import renderer from 'react-test-renderer'
import { Icon } from './Icon'

describe('Icon', () => {
  it('renders default Icon', () => {
    const tree = renderer
      .create(<Icon iconPrefix="fal" iconName="file-medical-alt" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
