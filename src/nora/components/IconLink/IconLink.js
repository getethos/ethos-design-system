import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// TODO -- we should probably create a generic Link component :)
const Link = ({
  className,
  href,
  onClick,
  children,
  target = '_self',
  ...rest
}) => {
  const handleClick = (ev) => {
    ev.preventDefault()
    if (!!onClick) {
      onClick(ev)
    }
  }
  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      target={target}
      data-link-id={rest['data-link-id']}
    >
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
  'data-link-id': PropTypes.string,
}

export const IconLink = ({
  iconPrefix,
  iconName,
  iconClassName,
  iconContainerClassName,
  textClassName,
  textPosition,
  copy,
  onClick,
  ...rest
}) => {
  if (textPosition === 'left') {
    return (
      <Link
        href="#"
        className={iconContainerClassName}
        onClick={onClick}
        data-link-id={rest['data-link-id']}
      >
        <span className={textClassName}>{copy}</span>
        <FontAwesomeIcon
          className={iconClassName}
          icon={[iconPrefix, iconName]}
        />
      </Link>
    )
  } else {
    return (
      <Link
        href="#"
        className={iconContainerClassName}
        onClick={onClick}
        data-link-id={rest['data-link-id']}
      >
        <FontAwesomeIcon
          className={iconClassName}
          icon={[iconPrefix, iconName]}
        />
        <span className={textClassName}>{copy}</span>
      </Link>
    )
  }
}

IconLink.propTypes = {
  props: PropTypes.shape({
    iconPrefix: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    iconClassName: PropTypes.string.isRequired,
    iconContainerClassName: PropTypes.string.isRequired,
    textClassName: PropTypes.string.isRequired,
    textPosition: PropTypes.oneOf(['left', 'right']).isRequired,
    copy: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    'data-link-id': PropTypes.string,
  }),
}
