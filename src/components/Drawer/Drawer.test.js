import React from 'react'
import { Drawer } from './index'
import { render } from '@testing-library/react'
import { idText } from 'typescript'

describe('Drawer', () => {
  it('default rendering', () => {
    const tree = render(<Drawer />)
    expect(tree).toMatchSnapshot()
  })
})
