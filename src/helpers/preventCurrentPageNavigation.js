import { isEnterKeyPress } from './isEnterKeyPress'

/**
 * Helper function to provide event handling for a user attempting to navigate
 * to the same page that they're already on.
 *
 * In the code below we strip forward slashes from the path and href that we're comparing.
 * This is done to account for query parameters being appended without a trailing slash.
 * For example /search?query=term vs /search/?query=term where the href is always /search/.
 * It will also account for the rare case we have an href missing it's trailing slash.
 *
 * IMPORTANT: Only handles relative URLs and will not parse absolute URLs passed to href
 *
 * @param {object} event - Event triggered by user interaction
 * @param {string} href - Relative URL for the link being clicked to cross check with window.location
 * @param {boolean} keyPress - Enable an onClick & onKeyPress listener
 * @param {function} samePageFunction - Function to execute when navigating to link of present page
 * @param {boolean} samePageCondition - Condition to check before executing samePageFunction
 *
 * @return {void}
 */
export const preventCurrentPageNavigation = ({
  event,
  href,
  keyPress,
  samePageFunction,
  samePageCondition,
}) => {
  if (
    typeof window === 'undefined' ||
    !samePageCondition ||
    (keyPress && !isEnterKeyPress(event))
  ) {
    return
  }
  let path, strippedHref
  const slashGlobalRegExp = /\//g
  if (window.location.pathname !== '/' && href !== '/') {
    path = window.location.pathname.replace(slashGlobalRegExp, '')
    strippedHref = href.replace(slashGlobalRegExp, '')
  } else {
    path = window.location.pathname
    strippedHref = href
  }
  if (window.location.hash) {
    path = path.replace(window.location.hash, '')
    strippedHref = strippedHref.replace(window.location.hash, '')
  }
  if (path === strippedHref) {
    event.preventDefault()
    samePageFunction()
  }
}
