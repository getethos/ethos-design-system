const useScrollItemIntoView = () => {
  /**
   * Used to scroll our dropdown option in to view if it's hidden
   */
  const scrollItemIntoView = (itemIndex, optionsRefs) => {
    /**
     * This is here to account for when React unmounts our ref
     */
    if (!optionsRefs || !optionsRefs[itemIndex || !optionsRefs[itemIndex]]) {
      return
    }
    // Here we call the method defined in useImperativeHandle within Option
    const itemEl = optionsRefs[itemIndex].current
    if (itemEl) {
      itemEl.scrollToTop()
    }
  }
  return {
    scrollItemIntoView,
  }
}

export default useScrollItemIntoView
