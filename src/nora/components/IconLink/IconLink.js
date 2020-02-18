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
  textClassName,
  textPosition,
  copy,
  onClick,
}) => {
  if (textPosition === 'left') {
    return (
      <Link href="#" className={iconContainerClassName} onClick={onClick}>
        <span className={textClassName}>{copy}</span>
        <FontAwesomeIcon
          className={iconClassName}
          icon={[iconPrefix, iconName]}
        />
      </Link>
    )
  } else {
    return (
      <Link href="#" className={iconContainerClassName} onClick={onClick}>
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
  }),
}
