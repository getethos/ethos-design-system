import { codes } from '../helpers/constants'

const usePopoverNavigation = () => {
  /**
   * Handles keydown events so we can navigate via tabs and arrows
   *
   * @param {object} props
   * @param {func} onChange - callback if user has pressed space or enter
   * @param {array} optionsRefs - array of react refs to the options
   * @param {func} scrollItemIntoView - helper used to scroll our dropdown
   * option in to view if it's hidden. @see src/hooks/useScrollItemIntoView.js
   * @param {func} activeOption - callback to get the active item index
   * @param {func} setActiveOption - callback to set active item index
   * @param {func} setShowPopover - callback to set whether to show the popover
   * or not
   * @param {func} setSelectedAndActiveOptions - callback to set both the
   * active and selected item indexes
   */
  const handlePopoverNavigation = ({
    ev,
    items,
    onChange,
    optionsRefs,
    activeOption,
    setActiveOption,
    scrollItemIntoView,
    showPopover,
    setShowPopover,
    setSelectedAndActiveOptions,
  }) => {
    switch (ev.keyCode) {
      case codes.SPACE:
      case codes.RETURN:
        ev.preventDefault()
        // Call the consumer with the currently selected item so they can update
        // their state accordingly, and also dismiss the dropdown options
        setSelectedAndActiveOptions(activeOption)
        // If this is being used on the trigger button or similar, we may need to
        // show our popover. If our popover is displayed, we want to dismiss it
        // as we've selected an item.
        setShowPopover(!showPopover)
        onChange(items[activeOption])
        scrollItemIntoView(activeOption, optionsRefs)
        break
      case codes.UP:
        // Prevents input cursor from jumping
        ev.preventDefault()
        if (activeOption > 0) {
          const previous = activeOption - 1
          setActiveOption(previous)
          scrollItemIntoView(previous, optionsRefs)
        }
        break
      case codes.DOWN:
        // Prevents input cursor from jumping
        ev.preventDefault()
        // if options closed and we're attempting to trigger opening w/down arrow
        if (!showPopover) {
          setShowPopover(true)
        }
        if (activeOption < items.length - 1) {
          const next = activeOption + 1
          setActiveOption(next)
          scrollItemIntoView(next, optionsRefs)
        } else {
          // On last item so circle back around to topmost item
          setActiveOption(0)
          scrollItemIntoView(0, optionsRefs)
        }
        break
      default:
        break
    }
  }
  return {
    handlePopoverNavigation,
  }
}

export default usePopoverNavigation
