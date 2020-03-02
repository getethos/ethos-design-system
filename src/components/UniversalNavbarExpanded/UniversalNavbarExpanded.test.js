import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import { UniversalNavbarExpanded } from './UniversalNavbarExpanded'

describe('<UniversalNavbarExpanded>', () => {
  describe('matches snapshot', () => {
    it('with no arguments', () => {
      expect(shallowSnapshot(<UniversalNavbarExpanded />)).toMatchSnapshot()
    })
  })
})

function shallowSnapshot(jsx) {
  const renderer = new ShallowRenderer()
  renderer.render(jsx)
  return renderer.getRenderOutput()
}
