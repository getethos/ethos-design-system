import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { Link } from './Link'
type IconLinkProps = {
  iconPrefix: string
  iconName: string
  iconClassName: string
  iconContainerClassName: string
  textClassName: string
  textPosition: 'left' | 'right'
  copy: string
  onClick?: (...args: any[]) => any
  'data-link-id'?: string
}
export const IconLink: React.FC<IconLinkProps> = ({
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
          icon={[iconPrefix as IconPrefix, iconName as IconName]}
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
          icon={[iconPrefix as IconPrefix, iconName as IconName]}
        />
        <span className={textClassName}>{copy}</span>
      </Link>
    )
  }
}
