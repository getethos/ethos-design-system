import React from 'react'
import PropTypes from 'prop-types'

// Reused assets from UniversalNavbar
import { default as BaseNavLink } from '../UniversalNavbar/NavLink'

// Helpers
import { isEnterKeyPress } from '../../helpers/isEnterKeyPress'

/**
 * Helper function to provide event handling for a user attempting to navigate
 * to the same page that they're already on.
 *
 * TODO test with query string parameters
 *
 * @param {object} event - Event triggered by user interaction
 * @param {string} href - URL for the link being clicked to cross check with window.location
 * @param {boolean} keyPress - Enable an onClick & onKeyPress listener
 * @param {function} samePageFunction - Function to execute when navigating to link of present page
 * @param {boolean} samePageCondition - Condition to check before executing samePageFunction
 *
 * @return {void}
 */
const handleSamePage = ({
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
  console.log(window.location)
  let pathOnly = window.location.href.replace(window.location.origin, '')
  console.log(pathOnly)
  if (window.location.search) {
    pathOnly = pathOnly.replace(window.location.search, '')
  }
  console.log(pathOnly)
  pathOnly = pathOnly.replace('/','')
  let strippedHref = href.replace('/', '')
  console.log(pathOnly)
  console.log(strippedHref)
  console.log(href)
  if (pathOnly === strippedHref) {
    event.preventDefault()
    samePageFunction()
  }
}

/**
 * Reusable navigation link, forked from UniversalNavbar NavLink.
 *
 * Provides the capability to trigger a function when user is attempting to navigate
 * to the same page that they're already on.
 *
 * @param {string|object} className - Optional className
 * @param {string} key - Unique differentiator for multiple instances of component (hint: uuid)
 * @param {string} href - URL for the link
 * @param {boolean} samePageAwareness - Enable an onClick & onKeyPress listener
 * @param {function} samePageFunction - Use with samePageAwareness to handle onClick & onKeyPress
 * @param {object} component - Agnotistic Reach and React Router Link (ex. Gatsby's <Link>)
 * @param {ReactNode} children - Children to render within the link
 *
 * @return {JSX.Element}
 */
const NavLink = ({
  className,
  key,
  href,
  samePageAwareness,
  samePageFunction,
  samePageCondition,
  LinkComponent,
  children,
}) => {
  if (samePageAwareness) {
    return (
      <BaseNavLink
        className={className || null}
        key={key ? key : null}
        href={href}
        LinkComponent={LinkComponent}
        onClick={(e) => {
          handleSamePage({
            event: e,
            href: href,
            keyPress: false,
            samePageFunction: samePageFunction,
            samePageCondition: samePageCondition,
          })
        }}
        onKeyPress={(e) =>
          handleSamePage({
            event: e,
            href: href,
            keyPress: true,
            samePageFunction: samePageFunction,
            samePageCondition: samePageCondition,
          })
        }
      >
        {children}
      </BaseNavLink>
    )
  }
  return (
    <BaseNavLink
      className={className}
      key={key ? key : null}
      href={href}
      LinkComponent={LinkComponent}
    >
      {children}
    </BaseNavLink>
  )
}

export default NavLink

NavLink.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  key: PropTypes.string,
  href: PropTypes.string.isRequired,
  samePageAwareness: PropTypes.bool,
  samePageFunction: PropTypes.func,
  samePageCondition: PropTypes.bool,
  LinkComponent: PropTypes.object,
  children: PropTypes.node.isRequired,
}
