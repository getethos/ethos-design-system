import { useState } from 'react'

export const useAccordionState = (initialState) => {
  const [expanded, setExpanded] = useState(initialState)
  const onToggle = (id) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id],
    })
  }
  return { expanded, onToggle }
}
