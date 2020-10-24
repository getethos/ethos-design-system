import * as React from 'react'
type NavLinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  href: string
  LinkComponent?: React.ElementType
}
const NavLink: React.SFC<NavLinkProps> = ({
  href,
  children,
  LinkComponent,
  ...props
}) => {
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
export default NavLink
