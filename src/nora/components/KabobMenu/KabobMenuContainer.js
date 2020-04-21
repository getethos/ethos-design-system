import React, { useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Options } from '../../../components/index'
import { KabobMenu } from './index'
import useScrollItemIntoView from '../../../hooks/useScrollItemIntoView'
import usePopoverNavigation from '../../../hooks/usePopoverNavigation'
import { getFocusableElements } from '../../../hooks/a11y/useTrapFocus'

export const KabobMenuContainer = ({
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
  const tabIndexResolved = tabIndex ? tabIndex : null
  const focusRefResolved = focusRef ? focusRef : null
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

  const popoverTrapRef = React.useRef()
  useLayoutEffect(() => {
    const prevFocusedEl = document.activeElement
    const elements = getFocusableElements(popoverTrapRef.current)
    if (isOpen && elements.length > 0) {
      elements[0].focus()
      document.body.addEventListener('keydown', handleOnKeyDown)
    }
    return () => {
      prevFocusedEl.focus()
      document.body.removeEventListener('keydown', handleOnKeyDown)
    }
  }, [popoverTrapRef, isOpen])

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

KabobMenuContainer.propTypes = {
  focusRef: PropTypes.object,
  tabIndex: PropTypes.number,
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  setLastSelected: PropTypes.func.isRequired,
  popoverContainerClasses: PropTypes.string.isRequired,
}
