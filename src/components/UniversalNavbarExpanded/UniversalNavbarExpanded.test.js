import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import { UniversalNavbarExpanded } from './UniversalNavbarExpanded'
import { CMS_LINKS } from './SampleContent'

describe('<UniversalNavbarExpanded>', () => {
  describe('matches snapshot', () => {
    it('builds with sample links provided', () => {
      expect(
        shallowSnapshot(
          <UniversalNavbarExpanded logoHref="/" links={CMS_LINKS} />
        )
      ).toMatchSnapshot()
    })
    it('builds with sample links provided and estimateExperiment enabled', () => {
      expect(
        shallowSnapshot(
          <UniversalNavbarExpanded
            logoHref="/"
            links={CMS_LINKS}
            estimateExperiment={true}
          />
        )
      ).toMatchSnapshot()
    })
    it('builds with sample links, hidden icons and secondary cta', () => {
      expect(
        shallowSnapshot(
          <UniversalNavbarExpanded
            logoHref={'/#/Components/UniversalNavbarExpanded'}
            links={CMS_LINKS}
            hideAccountIcon={true}
            hideSearchIcon={true}
            showSecondaryCta={true}
          />
        )
      ).toMatchSnapshot()
    })
    it('builds with sample links and fully animated background', () => {
      expect(
        shallowSnapshot(
          <UniversalNavbarExpanded
            logoHref={'/#/Components/UniversalNavbarExpanded'}
            links={CMS_LINKS}
            animateMobileNavbar
            animateDesktopNavbar
          />
        )
      ).toMatchSnapshot()
    })
    it('builds with sample links and animated desktop only background', () => {
      expect(
        shallowSnapshot(
          <UniversalNavbarExpanded
            logoHref={'/#/Components/UniversalNavbarExpanded'}
            links={CMS_LINKS}
            animateDesktopNavbar
          />
        )
      ).toMatchSnapshot()
    })
  })
})

function shallowSnapshot(jsx) {
  const renderer = new ShallowRenderer()
  renderer.render(jsx)
  return renderer.getRenderOutput()
}
