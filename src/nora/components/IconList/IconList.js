import PropTypes from 'prop-types'
import React, { useLayoutEffect, Children } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// TODO -- we should probably create a generic Link component :)
const Link = ({ className, href, onClick, target = '_self', children }) => {
  return (
    <a href={href} className={className} onClick={onClick} target={target}>
      {children}
    </a>
  )
}

export const IconList = ({ items }) => {
  const listItems = (list) => {
    return list.map((item, index) => {
      if (item.linkPosition === 'left') {
        return (
          <li key={index} className={item.iconContainerClassName}>
            <Link
              href="#"
              className={item.linkClassName}
              onClick={item.handleClick}
            >
              {item.copy}
            </Link>
            <FontAwesomeIcon
              className={item.iconClassName}
              icon={[item.iconPrefix, item.iconName]}
            />{' '}
          </li>
        )
      } else {
        return (
          <li key={index} className={item.iconContainerClassName}>
            <FontAwesomeIcon
              className={item.iconClassName}
              icon={[item.iconPrefix, item.iconName]}
            />{' '}
            <Link
              href="#"
              className={item.linkClassName}
              onClick={item.handleClick}
            >
              {item.copy}
            </Link>
          </li>
        )
      }
    })
  }
  return <ul>{listItems(items)}</ul>
}

IconList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      iconPrefix: PropTypes.string.isRequired,
      iconName: PropTypes.string.isRequired,
      iconClassName: PropTypes.string.isRequired,
      iconContainerClassName: PropTypes.string.isRequired,
      linkClassName: PropTypes.string.isRequired,
      linkPosition: PropTypes.oneOf(['left', 'right']).isRequired,
      copy: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
}
