import React from 'react'
import PropTypes from 'prop-types'
import { termHref, accountHref } from './constants'

/**
 * Checks if provided internal LinkComponent can be used with href
 * Specifc Link component's should not be using /term or /login
 * @param {string} href
 * @return {boolean}
 */
const validHRef = (href) => {
  return ![termHref, accountHref].includes(href)
}

const NavLink = ({ href, children, LinkComponent, ...props }) => {
  if (LinkComponent && validHRef(href)) {
    return (
      <LinkComponent to={href} {...props}>
        {children}
      </LinkComponent>
    )
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}

NavLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func,
  ]),
  href: PropTypes.string.isRequired,
  LinkComponent: PropTypes.object,
}

export default NavLink
