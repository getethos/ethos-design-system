import * as React from 'react'
import { useEffect, useRef } from 'react'
import { HeaderBar } from './HeaderBar'
import { useAccordionContext } from './useAccordionContext'
type AccordionSectionProps = {
  index?: number
  title: string
  renderToggle: (expanded: boolean) => JSX.Element
  labelClassName?: string
  panelClassName?: string
  toggleClassName?: string
}
export const AccordionSection: React.FC<AccordionSectionProps> = ({
  children,
  title,
  renderToggle,
  index = 0,
  labelClassName = '',
  panelClassName = '',
  toggleClassName = '',
}) => {
  const {
    focusRef,
    selected,
    expandedAll,
    onToggle,
    toggleChildIsTarget,
    onNavigation,
    id,
  } = useAccordionContext()
  const sectionId = `${id}-${index}-section`
  const labelId = `${id}-${index}-label`
  const expanded = expandedAll[index]
  const labelRef = useRef<any>()
  useEffect(() => {
    if (index === selected[0] && labelRef.current) {
      labelRef?.current?.focus()
    }
  }, [index, selected])
  return (
    <>
      <HeaderBar
        renderToggle={renderToggle}
        focusRef={focusRef}
        onToggle={onToggle}
        toggleChildIsTarget={toggleChildIsTarget}
        onNavigation={onNavigation}
        expanded={expanded}
        sectionId={sectionId}
        labelId={labelId}
        labelRef={labelRef}
        index={index}
        title={title}
        labelClassName={labelClassName}
        toggleClassName={toggleClassName}
      />
      <div
        role="region"
        aria-labelledby={labelId}
        id={sectionId}
        hidden={!expanded}
        className={panelClassName}
      >
        {children}
      </div>
    </>
  )
}
