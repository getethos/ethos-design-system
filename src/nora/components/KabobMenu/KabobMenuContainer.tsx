import * as React from 'react'
import { useState } from 'react'
import { KabobMenu, Options } from '../../../components'
import usePopoverNavigation from '../../../hooks/usePopoverNavigation'
import useScrollItemIntoView from '../../../hooks/useScrollItemIntoView'
type KabobMenuContainerProps = {
  focusRef?: React.Ref<any>
  tabIndex?: number
  setIsOpen: (...args: any[]) => any
  isOpen: boolean
  items: any[]
  dataKey: string
  setLastSelected: (...args: any[]) => any
  popoverContainerClasses: string
}
export const KabobMenuContainer: React.SFC<KabobMenuContainerProps> = ({
  focusRef,
  tabIndex,
  dataKey,
  items,
  isOpen,
  setIsOpen,
  setLastSelected,
  popoverContainerClasses,
}) => {
  /**
   * If we're using the data grid, we'll get tab index and focus ref as the grid, ultimately, needs to be able to
   * place focus on the kebob trigger button. However, once we've opened the menu, we need to temporarly sever the
   * grid's focus control, essentially, trapping focus in the popover dropdown until it's been closed.
   */
  const tabIndexResolved = tabIndex ? tabIndex : undefined // ethan: Isn't 0 a valid tabIndex?
  const focusRefResolved = focusRef ? focusRef : undefined // ethan: what is the purpose of this conditional?
  const [activeOption, setActiveOption] = useState(0)
  const [selectedOption, setSelectedOption] = useState(-1)
  const { scrollItemIntoView } = useScrollItemIntoView()
  const { handlePopoverNavigation } = usePopoverNavigation()
  const optionsRefs = Array(items.length)
    .fill(0)
    .map(() => React.createRef())
  const handleOnChange = (item) => {
    setLastSelected(item.name)
    setIsOpen(!isOpen)
  }
  const setSelectedAndActiveOptions = (index) => {
    setSelectedOption(index)
    setActiveOption(index)
  }
  const handleOnKeyDown = (ev) => {
    /**
     * Edge case:
     * If we've been passed in a focus ref (focusRefResolved), we're presumably being used from within the
     * data grid. So, ugly as it may be, we need to temporarily prevent the data grid's keydown listener
     * from receiving keydown events until the popover options are no longer opened.
     */
    if (focusRefResolved && isOpen) {
      ev.stopPropagation()
    }
    handlePopoverNavigation({
      ev: ev,
      items: items,
      onChange: handleOnChange,
      optionsRefs: optionsRefs,
      activeOption: activeOption,
      setActiveOption: setActiveOption,
      scrollItemIntoView: scrollItemIntoView,
      showPopover: isOpen,
      setShowPopover: setIsOpen,
      setSelectedAndActiveOptions: setSelectedAndActiveOptions,
    })
  }
  // ethan - what is this? and why is it not attached to any node?
  // const popoverTrapRef = React.useRef()
  // useLayoutEffect(() => {
  //   const prevFocusedEl = document.activeElement
  //   const elements = getFocusableElements(popoverTrapRef.current)
  //   if (isOpen && elements.length > 0) {
  //     elements[0].focus()
  //     popoverTrapRef.current.addEventListener('keydown', handleOnKeyDown)
  //   }
  //   return () => {
  //     prevFocusedEl.focus()
  //     popoverTrapRef?.current?.removeEventListener('keydown', handleOnKeyDown)
  //   }
  // }, [popoverTrapRef, isOpen])
  return (
    <KabobMenu
      focusRef={focusRefResolved}
      tabIndex={tabIndexResolved}
      onClick={() => {
        setIsOpen(!isOpen)
      }}
      onKeyDown={(ev) => handleOnKeyDown(ev)}
    >
      {isOpen ? (
        <ul className={popoverContainerClasses}>
          <Options
            activeOption={activeOption}
            dataKey={dataKey}
            entities={items}
            onChange={handleOnChange}
            optionsRefs={optionsRefs}
            selectedOption={selectedOption}
            setSelectedAndActiveOptions={setSelectedAndActiveOptions}
          />
        </ul>
      ) : (
        <> </>
      )}
    </KabobMenu>
  )
}
