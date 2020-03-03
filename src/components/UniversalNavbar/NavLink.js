import React from 'react'
import PropTypes from 'prop-types'

const NavLink = ({ href, children, LinkComponent, ...props }) => {
  if (LinkComponent) {
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
