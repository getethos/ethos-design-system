import { useState } from 'react'
import { Media } from '../Media/Media'

export const useAccordionState = (
  initialState,
  onCLick,
  mobileAutoCollapse
) => {
  const [expanded, setExpanded] = useState(initialState)
  const isMobile = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(
      `(max-width: ${Media.BREAKPOINTS.PHONE_RANGE_END}px)`
    ).matches
  }
  const onToggle = (id, itemText, itemValue) => {
    onCLick && onCLick(id, itemText, !itemValue)
    setExpanded({
      ...(!(mobileAutoCollapse && isMobile()) && expanded),
      [id]: !expanded[id],
    })
  }
  return { expanded, onToggle }
}
