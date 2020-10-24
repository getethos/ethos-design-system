import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

type IconProps = {
  iconPrefix: string
  iconName: string
  className?: string
}
export const Icon: React.SFC<IconProps> = ({
  iconPrefix,
  iconName,
  className,
}) => {
  return (
    <FontAwesomeIcon
      className={className}
      icon={[iconPrefix as IconPrefix, iconName as IconName]}
    />
  )
}
