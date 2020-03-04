import React from 'react'
import PropTypes from 'prop-types'

import { default as BaseNavLink } from '../UniversalNavbar/NavLink'
import { isEnterKeyPress } from '../../helpers/isEnterKeyPress'

const handleSamePage = (
  event,
  href,
  keyPress,
  samePageFunction,
  samePageCondition
) => {
  if (typeof window === 'undefined' || !samePageCondition) return
  if (keyPress) {
    if (!isEnterKeyPress(event)) return
  }
  const pathOnly = window.location.href.replace(window.location.origin, '')
  if (pathOnly === href) {
    event.preventDefault()
    samePageFunction()
  }
}

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
        className={className}
        key={key ? key : null}
        href={href}
        LinkComponent={LinkComponent}
        onClick={(e) => {
          handleSamePage(e, href, false, samePageFunction, samePageCondition)
        }}
        onKeyPress={(e) =>
          handleSamePage(e, href, true, samePageFunction, samePageCondition)
        }
      >
        {children}
      </BaseNavLink>
    )
  } else {
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
}

export default NavLink

NavLink.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  key: PropTypes.string,
  href: PropTypes.string.isRequired,
  samePageAwareness: PropTypes.bool,
  samePageFunction: PropTypes.func,
  component: PropTypes.object,
  children: PropTypes.node,
}
