import * as React from 'react'
import { useMemo, useRef, useState } from 'react'
import { codes } from '../../helpers/constants.js'
import { AccordionContext } from './useAccordionContext'
type AccordionProps = {
  id?: string
  expanded: object
  onToggle: (...args: any[]) => any
  toggleChildIsTarget?: boolean
}
/**
 * Accessible accordion primitive informed by WAI Practices:
 * https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html
 */
export const Accordion: React.SFC<AccordionProps> = ({
  children,
  expanded = null,
  onToggle,
  id,
  toggleChildIsTarget = false,
  ...rest
}) => {
  const focusRef = useRef<any>(null)
  const [selected, setSelected] = useState<[number | null]>([null])
  const context = useMemo(
    () => ({
      focusRef,
      selected,
      expandedAll: expanded,
      onToggle,
      toggleChildIsTarget,
      id: id,
      /**
       * Keyboard navigation
       */
      onNavigation: (keyCode) => {
        const lastIndex = React.Children.count(children) - 1
        const current = focusRef.current
        switch (keyCode) {
          case codes.DOWN:
            if (current === null) break
            if (current >= lastIndex) {
              setSelected([0])
            } else {
              setSelected([current + 1])
            }
            break
          case codes.UP:
            if (current === null) break
            if (current <= 0) {
              setSelected([lastIndex])
            } else {
              setSelected([current - 1])
            }
            break
          case codes.HOME:
            setSelected([0])
            break
          case codes.END:
            setSelected([lastIndex])
            break
          default:
        }
      },
    }),
    [selected, toggleChildIsTarget, setSelected, focusRef, children, id]
  )
  const renderSections = (sections) => {
    {
      return React.Children.map(
        sections,
        (section: React.ReactElement<{ index: number }>, index) => {
          return React.cloneElement(section, {
            ...section.props,
            index,
          })
        }
      )
    }
  }
  return (
    <div id={id} {...rest}>
      {/** ethan - odd ref ts error that i dont understand */}
      {/** @ts-ignore */}
      <AccordionContext.Provider value={context}>
        {renderSections(children)}
      </AccordionContext.Provider>
    </div>
  )
}
