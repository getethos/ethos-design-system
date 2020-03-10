import React from 'react'
import PropTypes from 'prop-types'

// Reused assets from UniversalNavbar
import { default as BaseNavLink } from '../UniversalNavbar/NavLink'

// Helpers
import { preventCurrentPageNavigation } from '../../helpers/preventCurrentPageNavigation'

/**
 * Reusable navigation link, forked from UniversalNavbar NavLink.
 *
 * Provides the capability to trigger a function when user is attempting to navigate
 * to the same page that they're already on.
 *
 * @param {string|object} className - Optional className
 * @param {string} key - Unique differentiator for multiple instances of component (hint: uuid)
 * @param {string} href - URL for the link
 * @param {boolean} currentPageAwareness - Enable an onClick & onKeyPress listener
 * @param {function} currentPageFunction - Use with currentPageAwareness to handle onClick & onKeyPress
 * @param {object} component - Agnotistic Reach and React Router Link (ex. Gatsby's <Link>)
 * @param {ReactNode} children - Children to render within the link
 *
 * @return {JSX.Element}
 */
const NavLink = ({
  className,
  key,
  href,
  currentPageAwareness,
  currentPageFunction,
  currentPageCondition,
  LinkComponent,
  children,
}) => {
  if (currentPageAwareness) {
    return (
      <BaseNavLink
        className={className || null}
        key={key ? key : null}
        href={href}
        LinkComponent={LinkComponent}
        onClick={(e) => {
          preventCurrentPageNavigation({
            event: e,
            href: href,
            keyPress: false,
            currentPageFunction: currentPageFunction,
            currentPageCondition: currentPageCondition,
          })
        }}
        onKeyPress={(e) =>
          preventCurrentPageNavigation({
            event: e,
            href: href,
            keyPress: true,
            currentPageFunction: currentPageFunction,
            currentPageCondition: currentPageCondition,
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
  currentPageAwareness: PropTypes.bool,
  currentPageFunction: PropTypes.func,
  currentPageCondition: PropTypes.bool,
  LinkComponent: PropTypes.object,
  children: PropTypes.node.isRequired,
}
