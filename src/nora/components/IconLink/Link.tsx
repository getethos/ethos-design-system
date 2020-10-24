import * as React from 'react'
type LinkProps = {
  className?: string
  href?: string
  onClick?: (...args: any[]) => any
  target?: string
  'data-link-id'?: string
}
export const Link: React.FC<LinkProps> = ({
  className,
  href,
  onClick,
  children,
  target = '_self',
  ...rest
}) => {
  const handleClick = (ev) => {
    ev.preventDefault()
    // eslint-disable-next-line no-extra-boolean-cast
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
