import { createContext, useContext } from 'react'
export const AccordionContext = createContext({
  focusRef: {},
  selected: [null],
  toggleChildIsTarget: false,
  expandedAll: [],
  onToggle: undefined,
  onNavigation: () => undefined,
  id: null,
})
export const useAccordionContext = () => useContext(AccordionContext)
