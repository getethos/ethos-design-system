import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// TODO -- we should probably create a generic Link component :)
const Link = ({ className, href, onClick, children, target = '_self' }) => {
  const handleClick = (ev) => {
    ev.preventDefault()
    onClick(ev)
  }
  return (
    <a href={href} className={className} onClick={handleClick} target={target}>
      {children}
    </a>
  )
}

Link.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  target: PropTypes.string,
}

export const IconLink = ({
  iconPrefix,
  iconName,
  iconClassName,
  iconContainerClassName,
  linkClassName,
  linkPosition,
  copy,
  onClick,
}) => {
  if (linkPosition === 'left') {
    return (
      <div className={iconContainerClassName}>
        <Link href="#" className={linkClassName} onClick={onClick}>
          {copy}
        </Link>
        <FontAwesomeIcon
          className={iconClassName}
          icon={[iconPrefix, iconName]}
        />{' '}
      </div>
    )
  } else {
    return (
      <div className={iconContainerClassName}>
        <FontAwesomeIcon
          className={iconClassName}
          icon={[iconPrefix, iconName]}
        />{' '}
        <Link href="#" className={linkClassName} onClick={onClick}>
          {copy}
        </Link>
      </div>
    )
  }
}

IconLink.propTypes = {
  props: PropTypes.shape({
    iconPrefix: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    iconClassName: PropTypes.string.isRequired,
    iconContainerClassName: PropTypes.string.isRequired,
    linkClassName: PropTypes.string.isRequired,
    linkPosition: PropTypes.oneOf(['left', 'right']).isRequired,
    copy: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }),
}
