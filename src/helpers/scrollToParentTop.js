// scrollToParentTop helper for scrolling an item
// to the top of its container element
export default (target) => (target.parentNode.scrollTop = target.offsetTop)
