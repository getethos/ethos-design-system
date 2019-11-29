import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import { UniversalNavbar } from './UniversalNavbar'

describe('<UniversalNavbar>', () => {
  describe('matches snapshot', () => {
    it('with no arguments', () => {
      expect(shallowSnapshot(<UniversalNavbar />)).toMatchSnapshot()
    })
  })
})

function shallowSnapshot(jsx) {
  const renderer = new ShallowRenderer()
  renderer.render(jsx)
  return renderer.getRenderOutput()
}
