import React from 'react'
import { Accordion } from './index'
import { AccordionSection } from './AccordionSection'
import { act } from 'react-test-renderer'
import testHook from '../../hooks/testHook.js'
import { useAccordionState } from './useAccordionState'
import { render } from '@testing-library/react'

const toggleChild = (expanded) => {
  return <span aria-hidden={true}>{expanded ? '▲' : '▼'}</span>
}

describe('Accordion', () => {
  it('default rendering', async () => {
    await act(async () => {
      testHook(() => {
        const { expanded, onToggle } = useAccordionState({ 1: true })
        const tree = render(
          <Accordion expanded={expanded} onToggle={onToggle}>
            <AccordionSection
              title="Section 1"
              id="id1"
              renderToggle={toggleChild}
            >
              <p>para</p>
              <span>span</span>
            </AccordionSection>
            <AccordionSection
              title="Section 2"
              id="id2"
              renderToggle={toggleChild}
            >
              <p>para</p>
              <span>span</span>
            </AccordionSection>
          </Accordion>
        )
        expect(tree).toMatchSnapshot()
      })
    })
  })
})
