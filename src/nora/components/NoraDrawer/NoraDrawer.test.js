import React from 'react'
import { NoraDrawer } from './index'
import { render } from '@testing-library/react'
import { idText } from 'typescript'

describe('NoraDrawer', () => {
  it('default rendering', () => {
    const tree = render(<NoraDrawer />)
    expect(tree).toMatchSnapshot()
  })
})
